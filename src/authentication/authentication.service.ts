import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { AuthDto } from './dto/auth.dto';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class AuthenticationService {


    constructor(
        private readonly userService: UsersService,
        private readonly jwtService: JwtService) { }



    async signIn({ email, password }: AuthDto) {
        const user = await this.userService.verifyCredentials(email, password);
        return await this.createToken(user);
    }

    async createToken(user: User) {
        return await this.jwtService.signAsync({
            email: user.email,
            id: user.id,
        }, {
            subject: user.id,
            expiresIn: process.env.JWT_EXPIRES_IN,
            secret: process.env.JWT_SECRET,
        })
    }

    async validateToken(token: string) {
        // return await this.jwtService.verifyAsync(token)
    }
}
