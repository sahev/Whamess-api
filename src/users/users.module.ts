import { Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users, MessagesInfo } from './entities/users.entity';
import UserController from './controllers/user.controller';

@Module({
  controllers: [UserController],
  imports: [TypeOrmModule.forFeature([Users, MessagesInfo])],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
