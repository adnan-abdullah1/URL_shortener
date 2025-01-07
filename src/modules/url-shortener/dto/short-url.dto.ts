import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class ShortUrlDto{
    @ApiProperty({
        description:"short url",
        example:"abc#123"
    })
    @IsString()
    shortURL:string
}