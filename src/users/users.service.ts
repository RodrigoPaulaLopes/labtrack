import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { compare, compareSync, hashSync } from 'bcrypt';
@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>) { }


  async create({ email, password, confirmPassword, firstName, lastName }: CreateUserDto) {
    const userExists = await this.usersRepository.findOne({ where: { email } });

    if (userExists) {
      throw new BadRequestException('User already exists');
    }

    if (password !== confirmPassword) {
      throw new BadRequestException('Passwords do not match');
    }

    password = hashSync(password, 10);

    const user = this.usersRepository.create({
      email,
      password,
      firstName,
      lastName,
    });

    await this.usersRepository.save(user);
    return user
  }


  findAll() {
    return this.usersRepository.find();
  }

  findOne(id: string) {
    const user = this.usersRepository.findOne({ where: { id } });
    if (!user) throw new NotFoundException('User not found');
    return user
  }

  async findByEmail(email: string) {
    const user = await this.usersRepository.findOne({ where: { email } });

    if (!user) throw new NotFoundException('User not found');

    return user;
  }
  
  async verifyCredentials(email: string, password: string) {
    const user = await this.usersRepository.findOne({ where: { email } });
    if (!user) throw new NotFoundException("Invalid credentials");

    if (!compareSync(password, user.password)) throw new NotFoundException("Invalid credentials");

    return user;

  }
  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
