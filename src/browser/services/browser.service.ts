import { Injectable, Scope } from '@nestjs/common';
import { title } from 'process';
import { Builder, Capabilities, WebDriver, By } from "selenium-webdriver";
import { Driver } from 'selenium-webdriver/chrome';

@Injectable({ scope: Scope.REQUEST })
export class BrowserService {
    browserName = 'chrome';
    capabilityName = 'goog:chromeOptions';
    builder: Builder;
    browserCapabilities: Capabilities;
    driver: WebDriver;
    imagebase64: any;
    chrome    = require('selenium-webdriver/chrome')

    async startbrowser(param) {
        
        const chrome = require('selenium-webdriver/chrome');

            let url = 'http://192.168.0.103:'+ param._n +'/wd/hub'
            this.driver = new Builder().forBrowser(this.browserName).setChromeOptions(new chrome.Options().addArguments('--remote-debugging-port=' + param._v)
            )
            .usingServer(url)
            .build()

            if(await this.driver.getTitle() === 'WhatsApp') {
                this.driver.quit()
                return 'true'
            } else {
                await this.driver.get('https://web.whatsapp.com/');
                await this.driver.getTitle();
                return 'true'
            }
    }
}
  