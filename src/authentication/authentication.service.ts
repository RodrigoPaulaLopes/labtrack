import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthenticationService {

    
    constructor(private readonly jwtService: JwtService) {}



    async createToken() {
        // return await this.jwtService.signAsync()
    }

    async validateToken(token: string) {
        // return await this.jwtService.verifyAsync(token)
    }
}
