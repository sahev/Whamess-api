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
        var self=this;
        let browserOptions = {
            'debuggerAddress': '127.0.0.1:' + param._v
        };
        let url = 'http://whamess.tk:'+ param._n +'/wd/hub'
        this.builder = new Builder().forBrowser(this.browserName).usingServer(url);
        this.browserCapabilities = Capabilities.chrome().set(this.capabilityName, browserOptions);
        this.driver = this.builder.withCapabilities(this.browserCapabilities).build();
         
        try{
            await this.driver.findElement(By.className('_3IKPF')).then(function(webElement) {
                self.driver.navigate().refresh();
            }, function(err) {
                if (err.state && err.state === 'no such element') {
                } 
            });
            let string = await this.driver.findElement(By.className('_1QMFu')).takeScreenshot();
            this.removeSession();
            return string;
        } catch {
            return 'Logado'
        }
    }

    removeSession(): void {
        this.driver.quit();
    }
}
