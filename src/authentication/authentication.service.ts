import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { AuthDto } from './dto/auth.dto';
import { User } from 'src/users/entities/user.entity';
import { TokenDto } from './dto/token.dto';

@Injectable()
export class AuthenticationService {


    constructor(
        private readonly userService: UsersService,
        private readonly jwtService: JwtService) { }



    async signIn({ email, password }: AuthDto) {
        const user = await this.userService.verifyCredentials(email, password);
        return this.createToken(user);
    }

    createToken(user: User) {
        const token = this.jwtService.sign({
            email: user.email,
            id: user.id,
        }, {
            subject: user.id,
            expiresIn: process.env.JWT_EXPIRES_IN,
            secret: process.env.JWT_SECRET,
        })
        return { accessToken: token } as TokenDto
    }

    isValidToken(token: string) {
        try {
            this.validateToken(token)
            return true
        } catch (error) {
            console.log(error);
            
            return false
        }
    }
    validateToken(token: string) {
        try {
            return this.jwtService.verify(token, {
                secret: process.env.JWT_SECRET,
            })
        } catch (error) {
            throw new BadRequestException(error.message)
        }
    }
}
