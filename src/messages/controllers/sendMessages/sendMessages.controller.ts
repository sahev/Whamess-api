import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { SendMessagesDTO } from './sendMessagesDTO';
import { SendMessagesService } from './sendMessages.service';

@Controller()
export class SendMessagesController {
  constructor(private sendMessagesService: SendMessagesService) { }

  @Post('messages/send')
  sendMessages(@Body(ValidationPipe) sendMessagesDto: SendMessagesDTO): string {
    let columns: string[] = [];
    sendMessagesDto.columnSheet[Object.keys(sendMessagesDto.columnSheet)[0]].map((itemColumnSheed, idx) => {
      if (idx === 0) {
        columns = itemColumnSheed;
        return
      }

      let formatedMessage = sendMessagesDto.message;
      columns.map((itemColumns, idx) => {
        if (sendMessagesDto.message.includes(`{${itemColumns}}`)) {
          formatedMessage = formatedMessage.replace(`{${itemColumns}}`, itemColumnSheed[idx])
        }
      })
      this.sendMessagesService.execute(itemColumnSheed[0], formatedMessage)
    })
    return "ok";
  }
}
