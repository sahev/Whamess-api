import { Injectable, Scope } from '@nestjs/common';
import { Builder, Capabilities, WebDriver, By } from "selenium-webdriver";

@Injectable({ scope: Scope.REQUEST })
export class SessionService {
    browserName = 'chrome';
    capabilityName = 'goog:chromeOptions';
    builder: Builder;
    browserCapabilities: Capabilities;
    driver: WebDriver;
    imagebase64: any;
    chrome    = require('selenium-webdriver/chrome')

    async getSession(param): Promise<boolean> {
        
        
        if (param._v !== undefined) {
            let browserOptions = {
                'debuggerAddress': 'localhost:' + param._v
            };
            let url = 'http://192.168.99.100:'+ param._n +'/wd/hub'
            this.builder = new Builder().forBrowser(this.browserName).usingServer(url);
            this.browserCapabilities = Capabilities.chrome().set(this.capabilityName, browserOptions);
            this.driver = this.builder.withCapabilities(this.browserCapabilities).build();
          
        }
        if (this.checkSession()) 
        {
            return this.checkSession();    
        } else {
            return false
        }
    }

    async checkSession(): Promise<any> {
        let status:boolean;
        await this.driver.findElement(By.className('_3LtPa'))
        .then(function(webElement) {
            status = true;
        }, function(err) {
            if (err.state && err.state === 'no such element') {
                status = false;
            } 
            status = false
        });
        this.driver.quit();
        return status
      }

    removeSession(): void {
        this.driver.quit();
    }
}
