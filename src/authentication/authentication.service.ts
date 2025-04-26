import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { AuthDto } from './dto/auth.dto';
import { User } from 'src/users/entities/user.entity';
import { TokenDto } from './dto/token.dto';
import { EmailService } from 'src/email/email/email.service';

@Injectable()
export class AuthenticationService {


    constructor(
        private readonly userService: UsersService,
        private readonly jwtService: JwtService,
        private readonly emailService: EmailService
    ) { }



    async signIn({ email, password }: AuthDto) {
        const user = await this.userService.verifyCredentials(email, password);
        return this.createToken(user);
    }

    async sendResetPasswordCode(email: string) {
        const user = await this.userService.findByEmail(email);


        const resetPasswordCode = Math.floor(100000 + Math.random() * 900000).toString();

        const expiresAt = new Date();
        expiresAt.setMinutes(expiresAt.getMinutes() + 10);


    

        const userUpdated = await this.userService.updateResetPasswordCode(user.id, resetPasswordCode, expiresAt, 3);

        this.emailService.sendEmail('rodrigo.plopesti@gmail.com', 'Recuperação de senha', `
        <h1>Recuperação de senha</h1>
        <p>Olá ${userUpdated.email},</p>
        <p>Você solicitou a recuperação de senha. Aqui está o seu código:</p>
        <h2>${userUpdated.codeResetPassword}</h2>
        <p>Se você não solicitou essa recuperação, ignore este e-mail.</p>
        <p>Atenciosamente,</p>
        <p>Equipe Labtrack</p>
        `)
        
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
