import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, IsOptional } from "class-validator";

export class EmailLoginDto {
  @ApiProperty({
    example: "user@example.com",
    description: "User email address",
    required: false
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: "password123",
    description: "User password"
  })
  @IsString()
  password: string;
}
