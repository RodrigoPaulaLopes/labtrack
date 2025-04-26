import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { AuthDto } from './dto/auth.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';

@Controller('auth')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post('login')
  async login(@Body() user: AuthDto) {
    return await this.authenticationService.signIn(user)
  }

  @Post('send-code')
  async resetPasswordCode(@Body('email') email: string) {
    return await this.authenticationService.sendResetPasswordCode(email)
  }
  @Put('reset-password/:token')
  async resetPassword(@Param('token') token: string,  @Body() resetPasswordDto: ResetPasswordDto) {
    return await this.authenticationService.resetPassword(token, resetPasswordDto)
  }
}
