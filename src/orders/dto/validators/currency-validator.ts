import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

const acceptedCurrencies = ['TWD', 'USD'];

export function IsValidCurrency(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isValidCurrency',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          return acceptedCurrencies.includes(value);
        },
        defaultMessage(args: ValidationArguments) {
          return 'Currency format is wrong';
        },
      },
    });
  };
}