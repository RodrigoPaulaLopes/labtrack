import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Roles } from 'src/users/enums/roles.enum';

@Injectable()
export class AdminGuard implements CanActivate {

  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {

    const requiredRoles = this.reflector.getAllAndOverride<Roles[]>('roles', [context.getHandler(), context.getClass()]);
    
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if(!requiredRoles){
      return true
    }
    
    if (!user) {
      return false;
    }
    if (user.role !== Roles.ADMIN) {
      return false;
    }
    
    return true;
  }
}
