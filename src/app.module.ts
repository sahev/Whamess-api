import { Module } from '@nestjs/common';
import { MessagesModule } from './messages/messages.module';
import { QrCodeModule } from './qrCode/qrCode.module';
import { SessionModule } from './session/session.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { BrowserModule } from './browser/browser.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users, MessagesInfo, ClientPorts } from './users/entities/users.entity';

@Module({
  imports: [
    MessagesModule,
    AuthModule,
    UsersModule,
    QrCodeModule,
    SessionModule,
    BrowserModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '168.197.24.119',
      port: 3306,
      username: 'admin',
      password: 'admin',
      database: 'testdb1',
      entities: [Users, MessagesInfo, ClientPorts],
      synchronize: true,
      migrationsTableName: "migration_table",
      migrations: ["src/migration2/*.js"],
      cli: {
        "migrationsDir": "migration"
      }
    }),
  ],
})

export class AppModule { }
