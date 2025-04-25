import { createParamDecorator, ExecutionContext, NotFoundException } from '@nestjs/common';

export const UserParam = createParamDecorator((data: string, context: ExecutionContext) => {
    const user = context.switchToHttp().getRequest().user
    
    if (!user) {
        throw new NotFoundException('User not found');
    }
    if(data) {
        return user[data]
    }
    return user
})