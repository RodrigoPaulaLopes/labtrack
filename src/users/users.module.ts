import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { AuthenticationService } from 'src/authentication/authentication.service';
import { JwtService } from '@nestjs/jwt';
@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService, AuthenticationService, JwtService],
  exports: [UsersService],
})
export class UsersModule { }
