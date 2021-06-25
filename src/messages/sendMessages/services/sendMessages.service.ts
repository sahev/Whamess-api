import { Injectable, Scope } from '@nestjs/common';
import { Builder, Capabilities, WebDriver } from "selenium-webdriver";

@Injectable({ scope: Scope.REQUEST })
export class SendMessagesService {

    browserName = 'chrome';
    capabilityName = 'goog:chromeOptions';
    builder: Builder;
    browserCapabilities: Capabilities;
    driver: WebDriver;

    constructor() {
        //this.builder = new Builder().forBrowser(this.browserName).usingServer('http://whamess.tk:5555/wd/hub');
        // this.browserCapabilities = Capabilities.chrome().set(this.capabilityName, this.browserOptions);
        // this.driver = this.builder.withCapabilities(this.browserCapabilities).build();
    }

    async execute(param, phoneNumber: string, message: string): Promise<any> {
        let browserOptions = {
            'debuggerAddress': 'localhost:' + param._v
        };
        let url = 'http://192.168.99.101:'+ param._n +'/wd/hub'
        this.builder = new Builder().forBrowser(this.browserName).usingServer(url);
        this.browserCapabilities = Capabilities.chrome().set(this.capabilityName, browserOptions);
        this.driver = this.builder.withCapabilities(this.browserCapabilities).build();
        const formattedMessage = this.formatMessage(message);
        try {
            await this.driver.executeScript(this.jsnum(phoneNumber));
            await this.driver.executeScript(this.jstext(formattedMessage));
        } finally {
            this.removeSession().catch(e => {})
        }
        
    }

    async removeSession(): Promise<void> {
        await this.driver.quit();
    }

    jsnum(phoneNumber: string): string {
        return "const openChat = phone => { " +
            "const link = document.createElement('a'); " +
            "link.setAttribute('href', 'whatsapp://send?phone=55" + phoneNumber + "');" +
            "document.body.append(link);link.click();" +
            "document.body.removeChild(link);" +
            "};" +
            "openChat();";
    }

    jstext(message: string): string {
        return "var eventFire = (MyElement, ElementType) => " +
            "{ var MyEvent = document.createEvent(\"MouseEvents\"); " +
            "MyEvent.initMouseEvent (ElementType, true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null); " +
            "MyElement.dispatchEvent(MyEvent); }; " +
            "function myFunc() " +
            "{ " +
            "messageBox = document.querySelectorAll(\"[contenteditable='true']\")[1]; " +
            "message = \"" + message + "\"; event = document.createEvent(\"UIEvents\"); " +
            "messageBox.innerHTML = message.replace(/ /gm, ' '); " +
            "event.initUIEvent(\"input\", true, true, window, 1); " +
            "messageBox.dispatchEvent(event); " +
            "eventFire(document.querySelector('span[data-icon=\"send\"]'), 'click'); " +
            "}; " +
            "myFunc();";
    }

    unified(phoneNumber: string, message: string): string {
        return "const openChat = phone => { " +
            "const link = document.createElement('a'); " +
            "link.setAttribute('href', 'whatsapp://send?phone=55" + phoneNumber + "');" +
            "document.body.append(link);link.click();" +
            "document.body.removeChild(link);" +
            "};" +
            "var eventFire = (MyElement, ElementType) => " +
            "{ var MyEvent = document.createEvent(\"MouseEvents\"); " +
            "MyEvent.initMouseEvent (ElementType, true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null); " +
            "MyElement.dispatchEvent(MyEvent); }; " +
            "function myFunc() " +
            "{ " +
            "messageBox = document.querySelectorAll(\"[contenteditable='true']\")[1]; " +
            "message = \"" + message + "\"; event = document.createEvent(\"UIEvents\"); " +
            "messageBox.innerHTML = message.replace(/ /gm, ' '); " +
            "event.initUIEvent(\"input\", true, true, window, 1); " +
            "messageBox.dispatchEvent(event); " +
            "eventFire(document.querySelector('span[data-icon=\"send\"]'), 'click'); " +
            "}; " +
            "openChat();" +
            "myFunc();";
    }

    formatMessage(message: string): string {
        return message.replace(/\n/g, "</br>");
    }

}
