import { Module } from '@nestjs/common';
import { MessagesModule } from './messages/messages.module';
import { LoginModule } from './login/login.module';

@Module({
  imports: [MessagesModule, LoginModule],
  controllers: [],
})
export class AppModule {}
