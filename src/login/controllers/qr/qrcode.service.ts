import { Injectable, Scope, Options } from '@nestjs/common';
import { Builder, Capabilities, WebDriver, By } from "selenium-webdriver";
var fs = require('fs');


//@Injectable({ scope: Scope.REQUEST })
@Injectable()
export class QRCodeService {

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
        this.builder = new Builder().forBrowser(this.browserName).usingServer('http://localhost:4444/wd/hub');
        this.browserCapabilities = Capabilities.chrome().set(this.capabilityName, this.browserOptions);
        this.driver = this.builder.withCapabilities(this.browserCapabilities).build();
    }


    async getqrcode(): Promise<any> {


        const filename = Math.random();
        this.driver.findElement(By.className('_1QMFu')).takeScreenshot().then(function (data) {
            var base64Data = data.replace(/^data:image\/png;base64,/, "");
            
            fs.writeFile("./src/login/controllers/qr/qrimages/" + filename + ".png", base64Data, 'base64', function (err) {
                if (err) console.log(err);
            });

        });

     

        // return "<img src=\"data:image/png;base64,"+image+"\"/>";

    }

}
