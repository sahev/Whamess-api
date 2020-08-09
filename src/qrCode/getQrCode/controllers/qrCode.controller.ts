import { Controller, Get } from '@nestjs/common';
import { QRCodeService } from '../services/qrCode.service';

@Controller('getqrcode')
export class QRCodeController {
  constructor(private QRCodeService: QRCodeService) { }
  @Get()
  async findAll(): Promise<any> {
    let string = await this.QRCodeService.getqrcode();
    return { string };
  } 
}
