import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { SendMessagesDTO } from './sendMessagesDTO';
import { SendMessagesService } from './sendMessages.service';

@Controller()
export class SendMessagesController {
  constructor(private sendMessagesService: SendMessagesService) { }

  @Post('messages/send')
  sendMessages(@Body(ValidationPipe) sendMessagesDto: SendMessagesDTO): string {
    return sendMessagesDto.message;
  }
}
