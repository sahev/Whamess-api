import { Module } from '@nestjs/common';
import { SendMessagesController } from './sendMessages/controllers/sendMessages.controller';
import { SendMessagesService } from './sendMessages/services/sendMessages.service';

@Module({
    controllers: [SendMessagesController],
    providers: [SendMessagesService],
})
export class MessagesModule { }
