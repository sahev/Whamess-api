/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Controller, UseGuards, Get, Delete, Param, Post, Body } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/passport/guards/jwt-auth.guard";
import { UsersService } from "../services/users.service";
import { createSecureServer } from "http2";
import { UsersDTO } from "../DTOs/users.dto";
import { getRepository } from "typeorm";
import { Users } from "../entities/users.entity";

@Controller()
export default class UserController {
    constructor(private userServices: UsersService) { }

    @UseGuards(JwtAuthGuard)
    @Get('users/get-all')
    getAllUsers() {
        const allUsers = this.userServices.findAll();
        return allUsers;
    }
    
    @UseGuards(JwtAuthGuard)
    @Delete('users/:id')
    deleteUser(@Param() params) {
        this.userServices.remove(params.id)
    }

    @UseGuards(JwtAuthGuard)
    @Post('users/')
    createUser(@Body() data: UsersDTO){
        return this.userServices.create(data);
    }

    @UseGuards(JwtAuthGuard)
    @Get('users/getbyemail/:email')
    async getByEmail(@Param() param) {
        return await this.userServices.getByEmail(param.email);
    }

    @UseGuards(JwtAuthGuard)
    @Post('users/messagescount/:id/:rows')
    async messagescount(@Param() param) {
        return await this.userServices.messagescount(param.id, param.rows);
    }
}