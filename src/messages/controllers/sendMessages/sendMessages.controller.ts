import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { SendMessagesDTO } from './sendMessagesDTO';
import { SendMessagesService } from './sendMessages.service';

@Controller()
export class SendMessagesController {
  constructor(private sendMessagesService: SendMessagesService) { }

  @Post('messages/send')
  async sendMessages(@Body(ValidationPipe) sendMessagesDto: SendMessagesDTO): Promise<any> {
    const columns = sendMessagesDto.columnSheet.shift();

    for (let index = 0; index < sendMessagesDto.columnSheet.length; index++) {

      let formatedMessage = sendMessagesDto.message;
      columns.map((itemColumns, idx) => {
        if (sendMessagesDto.message.includes(`{${itemColumns}}`)) {
          formatedMessage = formatedMessage.replace(`{${itemColumns}}`, sendMessagesDto.columnSheet[index][idx])
        }
      })

      await this.sendMessagesService.execute(sendMessagesDto.columnSheet[index][0], formatedMessage)
    }

    this.sendMessagesService.removeSession();
    return "ok";
  }
}
