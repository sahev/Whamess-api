import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { SendMessagesDTO } from './sendMessagesDTO';
import { SendMessagesService } from './sendMessages.service';

@Controller()
export class SendMessagesController {
  constructor(private sendMessagesService: SendMessagesService) { }

  @Post('messages/send')
  sendMessages(@Body(ValidationPipe) sendMessagesDto: SendMessagesDTO): string {
    let columns: string[] = [];
    const responseArray = [];
    sendMessagesDto.columnSheet[Object.keys(sendMessagesDto.columnSheet)[0]].map(async (itemColumnSheed, idx) => {
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
      await this.sendMessagesService.execute(itemColumnSheed[0], formatedMessage).then(response => {
        responseArray.push({ phone: itemColumnSheed[0], status: response })
      }).catch(error => {
        responseArray.push({ phone: itemColumnSheed[0], status: error })
      })
    })

    console.log(responseArray);

    return "ok";
  }
}
