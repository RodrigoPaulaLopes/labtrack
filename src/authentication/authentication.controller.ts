import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { AuthDto } from './dto/auth.dto';

@Controller('auth')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post('login')
  async login(@Body() user: AuthDto) {
    return await this.authenticationService.signIn(user)
  }

  @Post('send-code')
  async resetPasswordCode(@Body() email: string) {
    return await this.authenticationService.sendResetPasswordCode(email)
  }
}
