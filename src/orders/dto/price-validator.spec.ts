import { IsLessThanTwoThousand } from './price-validator';
import { validate } from 'class-validator';

class TestClass {
  @IsLessThanTwoThousand()
  price: number;
}

describe('IsLessThanTwoThousand', () => {
  it('應該通過驗證當價格小於或等於2000', async () => {
    const test = new TestClass();
    test.price = 1999;
    const errors = await validate(test);
    expect(errors.length).toBe(0);
  });

  it('應該通過驗證當價格等於2000', async () => {
    const test = new TestClass();
    test.price = 2000;
    const errors = await validate(test);
    expect(errors.length).toBe(0);
  });

  it('應該失敗驗證當價格大於2000', async () => {
    const test = new TestClass();
    test.price = 2001;
    const errors = await validate(test);
    expect(errors.length).toBe(1);
    expect(errors[0].constraints).toHaveProperty('isLessThanTwoThousand', 'Price is over 2000');
  });

  it('應該通過驗證當價格是非數字值', async () => {
    const test = new TestClass();
    const testCases = [undefined, null, NaN];
    for await (const testCase of testCases) {
      test.price = testCase;
      const errors = await validate(test);
      expect(errors.length).toBe(0);
    }
  });
});