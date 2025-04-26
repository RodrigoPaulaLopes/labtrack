import { Module } from '@nestjs/common';
import { ExperimentsModule } from './experiments/experiments.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { User } from './users/entities/user.entity';
import { UsersModule } from './users/users.module';
import { EmailModule } from './email/email/email.module';

@Module({
  imports: [

    ConfigModule.forRoot({ 
      isGlobal: true,
      envFilePath: ['.env'],
    }),
    TypeOrmModule.forRoot({
    type: 'mysql',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [User],
    synchronize: false,
  }), UsersModule, ExperimentsModule, AuthenticationModule, EmailModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
