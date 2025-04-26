import { IS_ALPHA, IsNotEmpty, IsStrongPassword } from "class-validator";

export class ResetPasswordDto {

    @IsNotEmpty()
    code: string;

    @IsNotEmpty()
    @IsStrongPassword({
        minLength: 8,
        minUppercase: 1,
        minLowercase: 1,
        minNumbers: 1,
        minSymbols: 1,
    })
    password: string

}