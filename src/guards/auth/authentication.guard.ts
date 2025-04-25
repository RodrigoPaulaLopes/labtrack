import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthenticationService } from 'src/authentication/authentication.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthenticationGuard implements CanActivate {

  constructor(
    private readonly authService: AuthenticationService,
    private readonly userService: UsersService
  ) { }
  async canActivate(
    context: ExecutionContext,
  ) : Promise<boolean> {


    const request = context.switchToHttp().getRequest()
    const {authorization} = request.headers
    const [signature, token] = (authorization ?? '').split(' ')
    

    
    if (signature !== 'Bearer') {
      return false
    }
    if (!token) {
      return false
    }

    const data = this.authService.validateToken(token)

    if (!data) {
      return false
    }

    request.tokenPayload = data

    request.user = await this.userService.findOne(data.id)
    
    return true;
  }
}
