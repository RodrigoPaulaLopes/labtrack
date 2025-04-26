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

    console.log(email);
    
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


  async updateResetPasswordCode(id: string, resetPasswordCode: string, expiresAt: Date) {

    const user = await this.findOne(id);
    user.codeResetPassword = resetPasswordCode;
    user.resetPasswordExpiresAt = expiresAt;

    await this.usersRepository.save(user);
    return user;

  }

  async updatePassword(id: string, password: string) {
    const user = await this.findOne(id);
    user.password = hashSync(password, 10);
    user.resetPasswordAttempts = 0;
    await this.usersRepository.save(user);
    return user;
  }

  async updateAttempts(id: string, attempts: number) {
    const user = await this.findOne(id);
    user.resetPasswordAttempts += 1;
    await this.usersRepository.save(user);
    return user;
  }

  update(id: string, user: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
