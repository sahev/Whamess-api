import { Module } from '@nestjs/common';
import { MessagesModule } from './messages/messages.module';
import { QrCodeModule } from './qrCode/qrCode.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [MessagesModule, AuthModule, UsersModule, QrCodeModule],
})

export class AppModule {}
