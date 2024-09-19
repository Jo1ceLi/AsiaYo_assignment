import { IsValidCurrency } from './currency-validator';
import { validate } from 'class-validator';

describe('IsValidCurrency', () => {
  class TestClass {
    @IsValidCurrency()
    currency: string;
  }

  it('應該通過有效的貨幣', async () => {
    const test = new TestClass();
    test.currency = 'TWD';
    const errors = await validate(test);
    expect(errors.length).toBe(0);

    test.currency = 'USD';
    const errors2 = await validate(test);
    expect(errors2.length).toBe(0);
  });

  it('應該拒絕無效的貨幣', async () => {
    const test = new TestClass();
    test.currency = 'EUR';
    const errors = await validate(test);
    expect(errors.length).toBe(1);
    expect(errors[0].constraints?.isValidCurrency).toBe('Currency format is wrong');
  });
});