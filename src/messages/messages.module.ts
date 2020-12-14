import { Module } from '@nestjs/common';
import { SendMessagesController } from './sendMessages/controllers/sendMessages.controller';
import { SendMessagesService } from './sendMessages/services/sendMessages.service';
import { UsersModule } from 'src/users/users.module';

@Module({
    controllers: [SendMessagesController],
    providers: [SendMessagesService,],
    imports: [UsersModule],
})
export class MessagesModule { }
