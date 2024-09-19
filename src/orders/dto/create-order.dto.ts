import { IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { IsEnglishOnly, IsCapitalized } from './validators/name-validator';
import { IsLessThanTwoThousand } from './validators/price-validator';
import { IsValidCurrency } from './validators/currency-validator';
import { IsRequiredField } from './validators/is-required-field-validator';

class AddressDto {
  @IsRequiredField()
  @IsString()
  city: string;

  @IsRequiredField()
  @IsString()
  district: string;

  @IsRequiredField()
  @IsString()
  street: string;
}

export class CreateOrderDto {
  @IsRequiredField()
  @IsString()
  id: string;

  @IsRequiredField()
  @IsString()
  @IsEnglishOnly()
  @IsCapitalized()
  name: string;

  @IsRequiredField()
  @ValidateNested()
  @Type(() => AddressDto)
  address: AddressDto;

  @IsRequiredField()
  @IsString()
  @IsLessThanTwoThousand()
  price: string;

  @IsRequiredField()
  @IsString()
  @IsValidCurrency()
  currency: 'TWD' | 'USD';
}