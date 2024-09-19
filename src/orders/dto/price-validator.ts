import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

export function IsLessThanTwoThousand(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isLessThanTwoThousand',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          if (Number.isNaN(Number(value))) {
            return true;
          } else {
            return Number(value) <= 2000;
          }
        },
        defaultMessage(args: ValidationArguments) {
          return 'Price is over 2000';
        },
      },
    });
  };
}
