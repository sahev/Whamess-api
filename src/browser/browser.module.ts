import { Module } from '@nestjs/common';
import { BrowserController } from './controllers/browser.controller';
import { BrowserService } from "./services/browser.service";


@Module({
    controllers: [BrowserController],
    providers: [BrowserService],
})
export class BrowserModule { }
