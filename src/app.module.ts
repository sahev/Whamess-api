import { Module } from '@nestjs/common';
import { MessagesModule } from './messages/messages.module';
import { QrCodeModule } from './qrCode/qrCode.module';

@Module({
  imports: [MessagesModule, QrCodeModule],
  controllers: [],
})
export class AppModule {}
