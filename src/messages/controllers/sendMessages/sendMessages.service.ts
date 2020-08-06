import { Injectable } from '@nestjs/common';
import { Builder, Capabilities } from "selenium-webdriver";

@Injectable()
export class SendMessagesService {

    browserName = 'chrome';
    capabilityName = 'goog:chromeOptions';
    browserOptions = {
        'debuggerAddress': '127.0.0.1:9222'
    };

    async execute(phoneNumber: string, message: string): Promise<any> {

        const builder = new Builder().forBrowser(this.browserName).usingServer('http://localhost:4444/wd/hub');
        const browserCapabilities = Capabilities.chrome().set(this.capabilityName, this.browserOptions);
        const driver = builder.withCapabilities(browserCapabilities).build();
        const formattedMessage = this.formatMessage(message);

        try {
            await driver.executeScript(this.jsnum(phoneNumber))
            await driver.executeScript(this.jstext(formattedMessage))
            return "OK"
        } catch (error) {
            return "ERROR"
        } finally {
            driver.quit();
        }
    }

    private jsnum(phoneNumber: string): string {
        return "const openChat = phone => { " +
            "const link = document.createElement('a'); " +
            "link.setAttribute('href', 'whatsapp://send?phone=55" + phoneNumber + "');" +
            "document.body.append(link);link.click();" +
            "document.body.removeChild(link);" +
            "};" +
            "openChat();";
    }

    private jstext(message: string): string {
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

    formatMessage(message: string): string {
        return message.replace(/\n/g, "</br>");
    }

}
