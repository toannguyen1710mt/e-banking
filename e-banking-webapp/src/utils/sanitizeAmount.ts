/**
 * Sanitizes a formatted number string by removing commas and parsing it as a float.
 *
 * @param formattedAmount - The formatted amount as a string (e.g., "1,234.56").
 * @returns The sanitized amount as a number.
 */
export const sanitizeAmount = (formattedAmount: string): number => {
  return parseFloat(formattedAmount.replace(/,/g, ''));
};
