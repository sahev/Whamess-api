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

    async getSession(param: { _v: string; _n: string; }): Promise<boolean> {
      if (param._v !== undefined) {
        const browserOptions = {
          debuggerAddress: 'localhost:' + param._v,
        };
        const url = 'http://192.168.99.101:' + param._n + '/wd/hub';
        this.builder = new Builder()
          .forBrowser(this.browserName)
          .usingServer(url);
        this.browserCapabilities = Capabilities.chrome().set(
          this.capabilityName,
          browserOptions,
        );
        this.driver = this.builder
          .withCapabilities(this.browserCapabilities)
          .build();
      }
  
      try {
        if (
          await (
            await this.driver.findElement(By.className('landing-headerTitle'))
          ).getText()
        ) {
          this.removeSession();
          return false;
        }
        this.removeSession();
        return false;
      } catch {
        try {
          if (
            await (
              await this.driver.findElement(By.className('landing-header'))
            ).isDisplayed()
          ) {
            await this.driver.findElement(By.className('_3DeCQ')).click();
            this.removeSession();
            return false;
          } else {
            this.removeSession();
            return false;
          }
        } catch {
          this.removeSession();
          return true;
        }
      }
    }

    async removeSession(): Promise<void> {
        await this.driver.quit();
    }
}
