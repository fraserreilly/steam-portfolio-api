import { IsJSON, IsNumber, IsOptional, IsString, IsUrl } from 'class-validator';

export class EditItemDto {
  @IsNumber()
  @IsOptional()
  appID?: number;

  @IsUrl()
  @IsOptional()
  image?: string;

  @IsJSON()
  @IsOptional()
  price?: { [key: number]: number };

  @IsJSON()
  @IsOptional()
  listings?: { [key: number]: number };
}
