import { IsNotEmpty } from 'class-validator';

export class SendMessagesDTO {
    @IsNotEmpty()
    columnSheet: any[];

    @IsNotEmpty()
    message: string;
}

export class SendMessageDTO {
    @IsNotEmpty()
    number: any[];

    @IsNotEmpty()
    message: string;
}