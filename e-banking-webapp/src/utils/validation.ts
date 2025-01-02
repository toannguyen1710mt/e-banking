/**
 * Sanitizes a string by removing commas.
 *
 * @param value - The string to sanitize.
 * @returns The sanitized string.
 */
export const sanitizeNumber = (value: string): string => {
  return value.replace(/,/g, '');
};

/**
 * Checks if a sanitized string is a valid number.
 * A valid number contains only digits, an optional decimal point, and no commas.
 *
 * @param value - The sanitized string to validate.
 * @returns `true` if the string is a valid number, `false` otherwise.
 */
export const isValidNumber = (value: string): boolean => {
  return /^\d*\.?\d*$/.test(value);
};
