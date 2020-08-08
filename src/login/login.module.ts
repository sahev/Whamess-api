import { Module } from '@nestjs/common';
import { QRCodeController } from './controllers/qr/qrcode.controller';
import { QRCodeService } from './controllers/qr/qrcode.service';

@Module({
    controllers: [QRCodeController],
    providers: [QRCodeService],
})
export class LoginModule { }
