import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {

  constructor(private readonly usersRepository: Repository<User>) {}
  create({email, password, confirmPassword, firstName, lastName}: CreateUserDto) {
      try {
        if (this.usersRepository.exists({ where: { email } })) {
          throw new BadRequestException('User already exists');
        }

        if (password !== confirmPassword) {
          throw new BadRequestException('Passwords do not match');
        }
        const user = this.usersRepository.create({
          email,
          password,
          firstName,
          lastName
        });
        this.usersRepository.save(user);
        return user;
      } catch (error) {
          throw new Error("Error creating user: " + error.message);
          
      }
    
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
