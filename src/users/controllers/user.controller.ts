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

    @Delete('users/:id')
    deleteUser(@Param() params) {
        this.userServices.remove(params.id)
    }

    @Post('users/')
    createUser(@Body() data: UsersDTO){
        return this.userServices.create(data);
    }

    @Get('users/getbyemail/:email')
    async getByEmail(@Param() param) {
        return await this.userServices.getByEmail(param.email);
    }

}