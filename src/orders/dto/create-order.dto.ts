import { IsString, ValidateNested, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';
import { IsEnglishOnly, IsCapitalized } from './validators/name-validator';
import { IsLessThanTwoThousand } from './validators/price-validator';
import { IsValidCurrency } from './validators/currency-validator';

class AddressDto {
  @IsString()
  city: string;

  @IsString()
  district: string;

  @IsString()
  street: string;
}

export class CreateOrderDto {
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsNotEmpty()
  @IsString()
  @IsEnglishOnly()
  @IsCapitalized()
  name: string;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => AddressDto)
  address: AddressDto;

  @IsNotEmpty()
  @IsString()
  @IsLessThanTwoThousand()
  price: string;

  @IsNotEmpty()
  @IsString()
  @IsValidCurrency()
  currency: 'TWD' | 'USD';
}