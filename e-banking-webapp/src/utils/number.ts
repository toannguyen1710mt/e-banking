/**
 * Formats a number with commas as thousands separators.
 *
 * @param number - The number to format.
 * @returns - A string representation of the number with commas.
 *
 * @example
 * formatNumberWithCommas(1234567); // Returns: '1,234,567'
 */
export const formatNumberWithCommas = (number: number): string => {
  return new Intl.NumberFormat('en-US').format(number);
};
