import { IsNotEmpty, IsEmail, IsString, IsPhoneNumber, IsInt, Min, Max } from "class-validator"

export class UsersDTO {
    name: string

    email: string
    password: string
    isActive: boolean
}

export interface UpdateUsersDTO {
    id: string,
    name: string,
    lastname: string, 
    email: string,
    phone: string    
}

export interface MessagesInfoDTO {
    usr_id: number,
    mes_messagesperday: number
}