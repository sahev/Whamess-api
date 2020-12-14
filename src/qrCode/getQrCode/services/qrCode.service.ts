import { Injectable, Scope } from '@nestjs/common';
import { Builder, Capabilities, WebDriver, By } from "selenium-webdriver";

@Injectable({ scope: Scope.REQUEST })
export class QRCodeService {
    browserName = 'chrome';
    capabilityName = 'goog:chromeOptions';
    builder: Builder;
    browserCapabilities: Capabilities;
    driver: WebDriver;
    imagebase64: any;

    async getqrcode(param): Promise<string> {

        let browserOptions = {
            'debuggerAddress': 'localhost:' + param._v
        };
        let url = 'http://192.168.99.100:'+ param._n +'/wd/hub'
        //let url = 'http://localhost:4444/wd/hub'
        this.builder = new Builder().forBrowser(this.browserName).usingServer(url);
        this.browserCapabilities = Capabilities.chrome().set(this.capabilityName, browserOptions);
        this.driver = this.builder.withCapabilities(this.browserCapabilities).build();

        if (!await this.checkAnotherBrowser() && !await this.checkExpiredCode())
        {
            return await this.qrCodestring();
        }
        
        if (await this.checkExpiredCode())
        {
            return await this.qrCodestring();
        }
    
        if (this.checkAnotherBrowser())
        {
            return await this.qrCodestring();
        } 
         
    }

    async checkQrCodeExists(): Promise<any> {
        var self = this;
        let status:boolean;
        await this.driver.findElement(By.className('_1yHR2'))
        .then(function(webElement) {
            status = true
        }, function(err) {
            if (err.state && err.state === 'no such element') {
                self.driver.navigate().refresh();
                status = false
            } 
        });
        return status
      }
    
      async checkAnotherBrowser(): Promise<any> {
        var self = this;
        let status:boolean;
    
        await this.driver.findElement(By.className('_30EVj IqPek'))
        .then(function(webElement) {
            self.driver.findElement(By.className('_30EVj IqPek')).click();
            status = true;
        }, function(err) {
            if (err.state && err.state === 'no such element') {
                status = false;
            } 
            status = false
        });
        return status
      }
    
      async checkExpiredCode(): Promise<any> {
        var self = this;
        let status:boolean = false;
        await this.driver.findElement(By.className('n9gYh'))
        .then(function(webElement) {
            self.driver.navigate().refresh();
            status = true
        }, function(err) {
            if (err.state && err.state === 'no such element') {
                status = false
            } 
        });
        return status
      }
    
    //   async getqrcode(): Promise<string> {
    //     //||
    //     if (!await this.checkAnotherBrowser() && !await this.checkExpiredCode())
    //     {
    //         return await this.qrCodestring();
    //     }
        
    //     if (await this.checkExpiredCode())
    //     {
    //         return await this.qrCodestring();
    //     }
    
    //     if (this.checkAnotherBrowser())
    //     {
    //         return await this.qrCodestring();
    //     } 
    // }
    
      removeSession(): void {
        this.driver.quit();
      }
    
      async qrCodestring(): Promise<string> {
        let string = ""
        let self = this;


        await this.driver.findElement(By.className('_1yHR2'))
        .then(async function(webElement) {
            string = await self.driver.findElement(By.className('_1yHR2')).takeScreenshot();
        }, function(err) {
            if (err.state && err.state === 'no such element') {
            } 
        });

        this.removeSession();
        return string;   
      }
      
    }