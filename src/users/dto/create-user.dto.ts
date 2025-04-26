import { Not } from "typeorm";
import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsStrongPassword } from 'class-validator'
import { Roles } from "../enums/roles.enum";
export class CreateUserDto {
    
    @IsNotEmpty()
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
    @IsNotEmpty()
    confirmPassword: string;
    @IsOptional()
    firstName?: string;
    @IsOptional()
    lastName?: string;

    @IsOptional()
    @IsEnum(Roles)
    role?: Roles


}
