import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthenticationService } from 'src/authentication/authentication.service';

@Injectable()
export class AuthenticationGuard implements CanActivate {

  constructor(private readonly authService: AuthenticationService) { }
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {


    const request = context.switchToHttp().getRequest()
    const {authorization} = request.headers
    const [signature, token] = (authorization ?? '').split(' ')
    

    
    if (signature !== 'Bearer') {
      return false
    }
    if (!token) {
      return false
    }

    const isValid = this.authService.isValidToken(token)

    if (!isValid) {
      return false
    }

    request.token = token
    
    return true;
  }
}
