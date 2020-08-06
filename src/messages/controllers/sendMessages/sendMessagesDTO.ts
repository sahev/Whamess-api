import { IsNotEmpty } from 'class-validator';

export class SendMessagesDTO {
    @IsNotEmpty()
    phoneNumbers: string[];

    @IsNotEmpty()
    message: string;
}