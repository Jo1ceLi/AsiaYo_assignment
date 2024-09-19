import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

export function IsRequiredField(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isRequiredField',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          return value !== null && value !== undefined && value !== '';
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} 為必填`;
        },
      },
    });
  };
}