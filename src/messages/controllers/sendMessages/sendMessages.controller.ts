import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { SendMessagesDTO } from './sendMessagesDTO';

@Controller()
export class SendMessagesController {

  @Post('messages/send')
  sendMessages(@Body(ValidationPipe) sendMessagesDto: SendMessagesDTO): string {
    return sendMessagesDto.message;
  }
}
