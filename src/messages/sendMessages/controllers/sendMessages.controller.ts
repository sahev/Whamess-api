import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  UseGuards,
  Query,
  Param,
} from '@nestjs/common';
import { SendMessagesDTO, SendMessageDTO } from '../DTOs/sendMessagesDTO';
import { SendMessagesService } from '../services/sendMessages.service';
import { JwtAuthGuard } from 'src/auth/passport/guards/jwt-auth.guard';
import { UsersService } from 'src/users/services/users.service';

@Controller()
export class SendMessagesController {
  constructor(private sendMessagesService: SendMessagesService) {}

  @UseGuards(JwtAuthGuard)
  @Post('messages/send')
  async sendMessages(
    @Query() param,
    @Body(ValidationPipe) sendMessagesDto: SendMessagesDTO,
  ): Promise<any> {
    const columns = sendMessagesDto.columnSheet.shift();

    for (let index = 0; index < sendMessagesDto.columnSheet.length; index++) {
      let formatedMessage = sendMessagesDto.message;
      columns.map((itemColumns, idx) => {
        if (sendMessagesDto.message.includes(`{${itemColumns}}`)) {
          formatedMessage = formatedMessage.replace(
            `{${itemColumns}}`,
            sendMessagesDto.columnSheet[index][idx],
          );
        }
      });

      await this.sendMessagesService.execute(
        param,
        sendMessagesDto.columnSheet[index][0],
        formatedMessage,
      );
    }

    this.sendMessagesService.removeSession();

    return sendMessagesDto.columnSheet.length;
  }

  //@UseGuards(JwtAuthGuard)
  @Post('message/send')
  async sendMessage(
    @Query() param,
    @Body(ValidationPipe) sendMessageDto: SendMessageDTO,
  ): Promise<any> {
    try {
      for (let index = 0; index < sendMessageDto.number.length; index++) {
        await this.sendMessagesService.execute(
          param,
          sendMessageDto.number[index],
          sendMessageDto.message,
        );
      }
      return { status: 200, message: 'message sent successfully' };
    } catch (e) {
      return { status: 401, message: 'API disconnected', err: e };
    }
  }
}
