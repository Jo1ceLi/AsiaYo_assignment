import { validate } from 'class-validator';
import { IsRequiredField } from './is-required-field-validator';

class TestClass {
  @IsRequiredField()
  testField: string;
}

describe('IsRequiredField', () => {
  it('應該通過當欄位不為空', async () => {
    const test = new TestClass();
    test.testField = 'Not empty';
    const errors = await validate(test);
    expect(errors.length).toBe(0);
  });

  it('應該拒絕當欄位為空字串', async () => {
    const test = new TestClass();
    test.testField = '';
    const errors = await validate(test);
    expect(errors.length).toBe(1);
    expect(errors[0].constraints?.isRequiredField).toBe('testField 為必填');
  });

  it('應該拒絕當欄位為null', async () => {
    const test = new TestClass();
    test.testField = null;
    const errors = await validate(test);
    expect(errors.length).toBe(1);
    expect(errors[0].constraints?.isRequiredField).toBe('testField 為必填');
  });

  it('應該拒絕當欄位為undefined', async () => {
    const test = new TestClass();
    const errors = await validate(test);
    expect(errors.length).toBe(1);
    expect(errors[0].constraints?.isRequiredField).toBe('testField 為必填');
  });
});