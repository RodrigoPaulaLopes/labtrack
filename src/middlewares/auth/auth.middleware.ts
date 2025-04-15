import { BadRequestException, HttpException, Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {

    const [type, token] = req.headers['authorization'].split(" ")

    if (!type && !token) throw new UnauthorizedException("Token invalid")

    if(type !== "Bearer") throw new BadRequestException("Type token invalid!")


    

    next();
  }
}
