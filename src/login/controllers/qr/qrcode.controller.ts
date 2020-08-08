import { Controller, Get } from '@nestjs/common';
import { QRCodeService } from './qrcode.service';
import { Driver } from 'selenium-webdriver/chrome';


@Controller('getqrcode')
export class QRCodeController {
  constructor(private QRCodeService: QRCodeService) { }
  @Get()
  findAll(): string {
    
    
    return 'This action returns qr code string' +    this.QRCodeService.getqrcode();
      
  }
}