import { IsEmail, IsNotEmpty, IsOptional, IsStrongPassword } from "class-validator";

export class AuthDto {
    
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    password: string;


}