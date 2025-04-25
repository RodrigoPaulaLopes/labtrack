import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/users.service';
import { AuthDto } from './dto/auth.dto';

@Injectable()
export class AuthenticationService {

    
    constructor(
        private readonly userService: UsersService,
        private readonly jwtService: JwtService) {}



    async signIn({email, password}: AuthDto) {
        const user = await this.userService.verifyCredentials(email, password);
        return user
    }

    async createToken() {
        // return await this.jwtService.signAsync()
    }

    async validateToken(token: string) {
        // return await this.jwtService.verifyAsync(token)
    }
}
