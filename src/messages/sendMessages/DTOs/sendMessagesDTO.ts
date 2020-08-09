import { IsNotEmpty } from 'class-validator';

export class SendMessagesDTO {
    @IsNotEmpty()
    columnSheet: any[];

    @IsNotEmpty()
    message: string;
}