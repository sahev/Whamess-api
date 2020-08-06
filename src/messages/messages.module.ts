import { Module } from '@nestjs/common';
import { SendMessagesController } from './controllers/sendMessages/sendMessages.controller';

@Module({
    controllers: [SendMessagesController]
})
export class MessagesModule {}
