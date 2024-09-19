
import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

export function IsString(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isString',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          return typeof value === 'string';
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} 型別應為 string`;
        },
      },
    });
  };
}