import { IsEmail, IsNumber, IsOptional, IsString } from 'class-validator';

export class EditUserDto {
  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  username?: string;

  @IsString()
  @IsOptional()
  hash?: string;

  @IsNumber()
  @IsOptional()
  salePercent?: number;
}
