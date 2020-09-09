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
  phone: string;

  @Column()
  password: string;

  @Column({ default: true })
  isActive: boolean;

  @Column({ default: 0 })
  messagesCount: number;

  @Column()
  createdOn: Date = new Date();

  
  @Column()
  expiresOn: Date = new Date((new Date()).setDate((new Date()).getDate() + 7));
}