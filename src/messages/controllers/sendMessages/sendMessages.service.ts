import { Injectable } from '@nestjs/common';
import webdriver from "selenium-webdriver";

@Injectable()
export class SendMessagesService {

    browserName = 'chrome';
    capabilityName = 'goog:chromeOptions';
    browserOptions = {
        'debuggerAddress': '127.0.0.1:9222'
    };
    browserCapabilities: any;
    builder: any;
    driver: any;

    jsnum(phoneNumber: string): string {
        return "const openChat = phone => { " +
            "const link = document.createElement('a'); " +
            "link.setAttribute('href', 'whatsapp://send?phone=" + phoneNumber + "');" +
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

    execute(phoneNumber: string, message: string): void {
        this.builder = new webdriver.Builder().forBrowser(this.browserName).usingServer('http://localhost:4444/wd/hub');
        this.driver = this.builder.withCapabilities(this.browserCapabilities).build();
        this.browserCapabilities = webdriver.Capabilities.chrome().set(this.capabilityName, this.browserOptions);

        this.driver.executeScript(this.jsnum(phoneNumber)).then(() => {
            this.driver.executeScript(this.jstext(message)).then(() => {
                this.driver.quit();
            });
        });
    }
}