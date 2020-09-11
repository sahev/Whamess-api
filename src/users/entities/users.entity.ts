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

@Entity()
export class MessagesInfo {
  
  @PrimaryGeneratedColumn()
  mes_id: number;

  @Column()
  usr_id: string;

  @Column({ default: 0 })
  mes_messagesperday: number;

  @Column({default: new Date().toISOString().slice(0,10)})
  mes_date: Date;

}