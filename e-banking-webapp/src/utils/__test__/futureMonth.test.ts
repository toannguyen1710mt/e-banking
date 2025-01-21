import { ERROR_MESSAGES } from '@/constants';
import { futureMonth } from '../futureMonth';

describe('futureMonth', () => {
  it('should pass for future month and valid date format', () => {
    const validDate = '12/25';
    expect(futureMonth.safeParse(validDate).success).toBe(true);
  });

  it('should fail for expired month', () => {
    const expiredDate = '01/20';
    const result = futureMonth.safeParse(expiredDate);
    expect(result.success).toBe(false);
    expect(result.error?.issues[0]?.message).toBe(
      ERROR_MESSAGES.EXPIRE_DATE_INVALID,
    );
  });

  it('should fail for invalid date format', () => {
    const invalidDate1 = '13/25';
    const invalidDate2 = '00/25';
    const invalidDate3 = '02/100';

    expect(futureMonth.safeParse(invalidDate1).success).toBe(false);
    expect(futureMonth.safeParse(invalidDate2).success).toBe(false);
    expect(futureMonth.safeParse(invalidDate3).success).toBe(false);
  });

  it('should fail for past month in current year', () => {
    const pastDate = '01/22';
    const result = futureMonth.safeParse(pastDate);
    expect(result.success).toBe(false);
    expect(result.error?.issues[0]?.message).toBe(
      ERROR_MESSAGES.EXPIRE_DATE_INVALID,
    );
  });

  it('should fail for empty or invalid month input', () => {
    const emptyDate = '';
    const invalidFormat = 'invalid-date';

    expect(futureMonth.safeParse(emptyDate).success).toBe(false);
    expect(futureMonth.safeParse(invalidFormat).success).toBe(false);
  });

  it('should pass for a valid future date (valid month and year)', () => {
    const newYear = new Date().getFullYear() + 1;
    const validDate = `09/${newYear.toString().slice(-2)}`;

    expect(futureMonth.safeParse(validDate).success).toBe(true);
  });
});
