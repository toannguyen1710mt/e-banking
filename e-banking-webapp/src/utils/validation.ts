import { jwtDecode } from 'jwt-decode';

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

/**
 * Checks if a JSON Web Token (JWT) is expired.
 *
 * @param {string} jwt - The JWT to check.
 * @returns {boolean} True if the token is expired, false otherwise.
 */
export const isInValidToken = (jwt: string) => {
  if (!jwt) return true;

  try {
    const decodedToken = jwtDecode(jwt);
    if (!decodedToken.exp) return true;
    const currentTime = Date.now() / 1000;

    return decodedToken.exp < currentTime;
  } catch (error) {
    console.error('Error decoding token:', error);
    return true;
  }
};
