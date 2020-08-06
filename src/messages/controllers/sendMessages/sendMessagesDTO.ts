import { IsNotEmpty } from 'class-validator';

export class SendMessagesDTO {
    @IsNotEmpty()
    

    @IsNotEmpty()
    phoneNumbers: string[];

    @IsNotEmpty()
    message: string;
}