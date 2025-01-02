/**
 * Checks if a given string is a valid number.
 * A valid number contains only digits, an optional decimal point, and no commas.
 *
 * @param value - The string to validate.
 * @returns `true` if the string is a valid number, `false` otherwise.
 */
export const isValidNumber = (value: string): boolean => {
  const inputValue = value.replace(/,/g, '');

  return /^\d*\.?\d*$/.test(inputValue);
};
