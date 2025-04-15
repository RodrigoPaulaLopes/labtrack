import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const User = createParamDecorator((data: string, context: ExecutionContext) => {
    const user = context.switchToHttp().getRequest().user

    if(data){
       return user[data]; 
    }
    return user
})