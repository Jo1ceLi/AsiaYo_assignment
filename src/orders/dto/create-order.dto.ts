import { IsString, IsNumber, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { IsEnglishOnly, IsCapitalized } from './name-validator';
class AddressDto {
  @IsString()
  city: string;

  @IsString()
  district: string;

  @IsString()
  street: string;
}

export class CreateOrderDto {
  @IsString()
  id: string;

  @IsString()
  @IsEnglishOnly()
  @IsCapitalized()
  name: string;

  @ValidateNested()
  @Type(() => AddressDto)
  address: AddressDto;

  @IsNumber()
  price: number;

  @IsString()
  currency: string;
}