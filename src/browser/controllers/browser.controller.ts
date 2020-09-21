import { Controller, Get, UseGuards, Delete, Query } from '@nestjs/common';
import { BrowserService } from "../services/browser.service";
import { JwtAuthGuard } from 'src/auth/passport/guards/jwt-auth.guard';


@Controller('browser')
export class BrowserController {
    constructor(private BrowserService: BrowserService) { }
    @UseGuards(JwtAuthGuard)
    @Get()
    async findAll(@Query() param) {
        let opened = await this.BrowserService.startbrowser(param);
        return { opened };
    }
}