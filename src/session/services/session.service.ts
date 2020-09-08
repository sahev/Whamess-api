import { Injectable, Scope } from '@nestjs/common';
import { Builder, Capabilities, WebDriver, By } from "selenium-webdriver";

@Injectable({ scope: Scope.REQUEST })
export class SessionService {
    browserName = 'chrome';
    capabilityName = 'goog:chromeOptions';
    browserOptions = {
        'debuggerAddress': '127.0.0.1:9222'
    };
    builder: Builder;
    browserCapabilities: Capabilities;
    driver: WebDriver;
    imagebase64: any;

    constructor() {
        this.builder = new Builder().forBrowser(this.browserName).usingServer('http://whamess.tk:4444/wd/hub');
        this.browserCapabilities = Capabilities.chrome().set(this.capabilityName, this.browserOptions);
        this.driver = this.builder.withCapabilities(this.browserCapabilities).build();
    }

    async getSession(): Promise<boolean> {
        try {
            await (await this.driver.findElement(By.className('landing-headerTitle'))).getText();
            this.removeSession();
            return false
        } catch {
            this.removeSession();
            return true
        }
    }

    removeSession(): void {
        this.driver.quit();
    }
}
