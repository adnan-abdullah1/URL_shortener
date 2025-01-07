import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsUrl } from "class-validator";

export class UrlDto{
    @ApiProperty({
        description:"original url",
        example:"https://google.com"
    })
    @IsUrl({}, { message: 'The URL must be a valid web address.' })
    @IsString()
    url:string
}