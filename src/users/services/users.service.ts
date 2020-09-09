import { Injectable, HttpStatus, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from '../entities/users.entity';
import { Repository, getConnection } from 'typeorm';
import { UsersDTO } from '../DTOs/users.dto';

@Injectable()
export class UsersService {
  private readonly users: Users[];

  constructor(@InjectRepository(Users) private usersRepository: Repository<Users>) {

  }

  findAll(): Promise<Users[]> {
    return this.usersRepository.find();
  }

  findOne(id: string): Promise<Users> {
    return this.usersRepository.findOne(id);
  }

  async getByEmail(email: string) {
    return await this.usersRepository.findOne({ email });
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async create(data: UsersDTO) {
    const user = await this.usersRepository.create(data);
    try {
      let checkexists = await this.usersRepository.findOne({ email: data.email });
      if(checkexists.email === data.email) {
        return new BadRequestException('Cadastro existente');
      } 
    } catch {
      await this.usersRepository.save(user);
      return user;
    }
  }

  async messagescount(id: number, rows: string) {

    const property = await this.usersRepository.findOne({
      where: { id }
    });

    const count = parseInt(property.messagesCount.toString()) + parseInt(rows)

    await getConnection()
      .createQueryBuilder()
      .update(Users)
      .set({ messagesCount: count })
      .where("id = :id", { id })
      .execute();

    return await this.usersRepository.findOne({
      where: { id }
    });

  }
}