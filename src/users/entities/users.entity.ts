import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  lastname: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  createdOn: Date = new Date();

  @Column({ default: true })
  isActive: boolean;

  @Column({ default: 0 })
  messagesCount: number;
}