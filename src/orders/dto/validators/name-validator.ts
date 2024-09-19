import { registerDecorator, ValidationArguments, ValidationOptions } from "class-validator";

export function IsEnglishOnly(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isEnglishOnly',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          return /^[A-Za-z\s]*$/.test(value);
        },
        defaultMessage(args: ValidationArguments) {
          return 'Name contains non-English characters';
        },
      },
    });
  };
}

export function IsCapitalized(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isCapitalized',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          return /^[A-Z][a-z]*(\s[A-Z][a-z]*)*$/.test(value);
        },
        defaultMessage(args: ValidationArguments) {
          return 'Name is not capitalized';
        },
      },
    });
  };
}