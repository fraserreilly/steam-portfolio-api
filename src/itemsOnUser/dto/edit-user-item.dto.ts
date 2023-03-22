import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsNumber,
  IsDate,
} from 'class-validator';

export class EditUserItemDto {
  @IsDate()
  @IsNotEmpty()
  dateAssigned: Date;

  @IsNumber()
  @IsNotEmpty()
  priceAssigned: number;

  @IsNumber()
  @IsNotEmpty()
  listingsAssigned: number;

  @IsDate()
  @IsOptional()
  dateDismissed?: Date;

  @IsNumber()
  @IsOptional()
  priceDismissed?: number;

  @IsNumber()
  @IsOptional()
  listingsDismissed?: number;

  @IsString()
  @IsOptional()
  notes?: string;
}
