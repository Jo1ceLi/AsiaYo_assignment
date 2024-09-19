import { IsString } from './is-string-validator';
import { validate } from 'class-validator';

describe('IsString decorator', () => {
  class TestClass {
    @IsString()
    testProperty: any;
  }

  it('應該通過驗證當屬性是字串時', async () => {
    const test = new TestClass();
    test.testProperty = 'This is a string';

    const errors = await validate(test);
    expect(errors.length).toBe(0);
  });

  it('應該拒絕當屬性不是字串時', async () => {
    const test = new TestClass();
    test.testProperty = 123;

    const errors = await validate(test);
    expect(errors.length).toBe(1);
    expect(errors[0].constraints?.isString).toBe('testProperty 型別應為 string');
  });
});