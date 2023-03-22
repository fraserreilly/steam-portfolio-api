import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsNumber,
  IsJSON,
  IsUrl,
} from 'class-validator';

export class CreateItemDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  appID: number;

  @IsUrl()
  @IsOptional()
  image?: string;

  @IsJSON()
  @IsNotEmpty()
  price: { [key: number]: number };

  @IsJSON()
  @IsNotEmpty()
  listings: { [key: number]: number };
}
