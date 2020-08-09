import { Module } from '@nestjs/common';
import { QRCodeController } from './getQrCode/controllers/qrCode.controller';
import { QRCodeService } from './getQrCode/services/qrCode.service';

@Module({
    controllers: [QRCodeController],
    providers: [QRCodeService],
})
export class QrCodeModule { }
