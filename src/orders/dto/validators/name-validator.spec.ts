import { IsEnglishOnly, IsCapitalized } from './name-validator';
import { validate } from 'class-validator';

describe('Name Validators', () => {
  class EnglishOnlyTestClass {
    @IsEnglishOnly()
    englishName: string;
  }

  describe('IsEnglishOnly', () => {
    it('應該通過只包含英文字母的名字', async () => {
      const test = new EnglishOnlyTestClass();
      test.englishName = 'John Doe';
      const errors = await validate(test);
      expect(errors.length).toBe(0);
    });

    it('應該拒絕包含非英文字符的名字', async () => {
      const test = new EnglishOnlyTestClass();
      test.englishName = '約翰 多伊';
      const errors = await validate(test);
      expect(errors.length).toBe(1);
      expect(errors[0].constraints?.isEnglishOnly).toBe('Name contains non-English characters');
    });
  });

  class CapitalizedTestClass {
    @IsCapitalized()
    capitalizedName: string;
  }

  describe('IsCapitalized', () => {
    it('應該通過正確大寫的名字', async () => {
      const test = new CapitalizedTestClass();
      test.capitalizedName = 'John Doe';
      const errors = await validate(test);
      expect(errors.length).toBe(0);
    });

    it('應該拒絕未正確大寫的名字', async () => {
      const test = new CapitalizedTestClass();
      test.capitalizedName = 'john doe';
      const errors = await validate(test);
      expect(errors.length).toBe(1);
      expect(errors[0].constraints?.isCapitalized).toBe('Name is not capitalized');
    });

    it('應該拒絕中間小寫的名字', async () => {
      const test = new CapitalizedTestClass();
      test.capitalizedName = 'John dOe';
      const errors = await validate(test);
      expect(errors.length).toBe(1);
      expect(errors[0].constraints?.isCapitalized).toBe('Name is not capitalized');
    });
  });
});