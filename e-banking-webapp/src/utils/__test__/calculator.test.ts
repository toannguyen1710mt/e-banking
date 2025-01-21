import { calculatePercentage } from '../calculator';

describe('calculatePercentage', () => {
  it('should return the correct percentage for a valid value and total', () => {
    expect(calculatePercentage(50, 200)).toBe(25);
    expect(calculatePercentage(30, 120)).toBe(25);
    expect(calculatePercentage(1, 4)).toBe(25);
  });

  it('should return 0 if the total is 0', () => {
    expect(calculatePercentage(30, 0)).toBe(0);
    expect(calculatePercentage(0, 0)).toBe(0);
  });

  it('should return 100% if value is equal to total', () => {
    expect(calculatePercentage(200, 200)).toBe(100);
    expect(calculatePercentage(50, 50)).toBe(100);
  });

  it('should handle negative numbers correctly', () => {
    expect(calculatePercentage(-50, 200)).toBe(-25);
    expect(calculatePercentage(50, -200)).toBe(-25);
  });

  it('should handle decimal numbers correctly', () => {
    expect(calculatePercentage(25.5, 102)).toBeCloseTo(25);
    expect(calculatePercentage(30.5, 120)).toBeCloseTo(25.42);
  });
});
