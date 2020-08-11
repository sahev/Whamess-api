/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Controller, UseGuards, Get, Delete, Param } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/passport/guards/jwt-auth.guard";
import { UsersService } from "../services/users.service";

@Controller()
export default class UserController {
    constructor(private userServices: UsersService) { }

    // @UseGuards(JwtAuthGuard)
    @Get('users/get-all')
    getAllUsers() {
        const allUsers = this.userServices.findAll();
        return allUsers;
    }

    @Delete('users/:id')
    deleteUser(@Param() params) {
        this.userServices.remove(params.id)
    }
}