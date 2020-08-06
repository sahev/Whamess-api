import { Module } from '@nestjs/common';
import { SendMessagesController } from './controllers/sendMessages/sendMessages.controller';
import { SendMessagesService } from './controllers/sendMessages/sendMessages.service';

@Module({
    controllers: [SendMessagesController],
    providers: [SendMessagesService],
})
export class MessagesModule { }
