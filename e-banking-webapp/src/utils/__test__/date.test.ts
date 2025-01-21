import {
  formatDate,
  formatMonthYear,
  formatYearMonthToShortDate,
  getGreeting,
} from '../date';

describe('Date', () => {
  describe('formatDate', () => {
    it('should format date to en-GB format (dd/mm/yyyy)', () => {
      expect(formatDate('2024-01-15')).toBe('15/01/2024');
    });
  });

  describe('formatYearMonthToShortDate', () => {
    it('should format date to MM/YY', () => {
      expect(formatYearMonthToShortDate('2024-01-15')).toBe('01/24');
    });
  });

  describe('formatMonthYear', () => {
    it('should format year and month to MM/YY', () => {
      expect(formatMonthYear({ year: 2024, month: 3 })).toBe('03/24');
    });
    it('should handle single digit months correctly', () => {
      expect(formatMonthYear({ year: 2025, month: 9 })).toBe('09/25');
    });
  });

  describe('getGreeting', () => {
    it('should return Good Morning for hours < 12', () => {
      jest.spyOn(global.Date.prototype, 'getHours').mockReturnValue(9);
      expect(getGreeting()).toBe('Good Morning');
    });
    it('should return Good Afternoon for hours between 12 and 17', () => {
      jest.spyOn(global.Date.prototype, 'getHours').mockReturnValue(15);
      expect(getGreeting()).toBe('Good Afternoon');
    });
    it('should return Good Evening for hours >= 18', () => {
      jest.spyOn(global.Date.prototype, 'getHours').mockReturnValue(19);
      expect(getGreeting()).toBe('Good Evening');
    });
  });
});
