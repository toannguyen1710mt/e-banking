import { isValidNumber, sanitizeNumber } from '../validation';

describe('Validation', () => {
  describe('sanitizeNumber', () => {
    it('should remove commas from the string', () => {
      expect(sanitizeNumber('1,000,000')).toBe('1000000');
      expect(sanitizeNumber('100,000.50')).toBe('100000.50');
      expect(sanitizeNumber('1,234')).toBe('1234');
    });

    it('should return the same string if no commas are present', () => {
      expect(sanitizeNumber('12345')).toBe('12345');
      expect(sanitizeNumber('123.45')).toBe('123.45');
    });

    it('should handle empty strings', () => {
      expect(sanitizeNumber('')).toBe('');
    });
  });

  describe('isValidNumber', () => {
    it('should return true for valid numbers', () => {
      expect(isValidNumber('12345')).toBe(true);
      expect(isValidNumber('123.45')).toBe(true);
      expect(isValidNumber('0')).toBe(true);
      expect(isValidNumber('12345.678')).toBe(true);
    });

    it('should return false for invalid numbers', () => {
      expect(isValidNumber('12,345')).toBe(false);
      expect(isValidNumber('123.45.67')).toBe(false);
      expect(isValidNumber('123a45')).toBe(false);
      expect(isValidNumber('!@#')).toBe(false);
    });
  });
});
