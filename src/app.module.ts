import { Module } from '@nestjs/common';
import { MessagesModule } from './messages/messages.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [MessagesModule, AuthModule, UsersModule],
  controllers: [],
})
export class AppModule {}
