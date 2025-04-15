import { IsEmail, IsNotEmpty, IsStrongPassword } from 'class-validator';

export class CreateUserDto {

        firstName?: string;
        lastName?: string;
        
        @IsEmail()
        email: string;
      
        @IsNotEmpty()
        @IsStrongPassword({
          minLength: 8, 
            minUppercase: 1,
            minLowercase: 1,
            minNumbers: 1,
            minSymbols: 1,
        })
        password: string;
}
