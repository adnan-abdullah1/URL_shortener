import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, minLength, MinLength } from "class-validator";

export class AuthDto{
    @ApiProperty({
        description: 'Email address',
        example: 'adnan@gmail.com',
    })
    @IsString()
    @IsNotEmpty()
    @IsEmail()
     email: string

     @ApiProperty({
        description: 'Password',
        example: 'password',
    })
     @IsNotEmpty()
     password: string;

}