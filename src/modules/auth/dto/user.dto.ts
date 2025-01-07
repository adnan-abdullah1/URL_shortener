import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class UserDto{
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

     @ApiProperty({
        description: 'First Name',
        example: 'John',
    })
    @MinLength(5)
     @IsNotEmpty()
     @IsString()
    firstName:string
     @ApiProperty({
        description: 'Last Name',
        example: 'Doe',
    })
     @IsNotEmpty()
     @IsString()
     lastName: string;

     

}