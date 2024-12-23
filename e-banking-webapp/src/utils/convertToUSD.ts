// Constants
import { EXCHANGE_RATES_TO_USD } from '@/constants';

type RecipientAccount = keyof typeof EXCHANGE_RATES_TO_USD;

/**
 * Converts an amount from a specific recipient account's currency to USD.
 *
 * @param recipientAccount - The key representing the recipient's account type,
 *                           which must match one of the keys in `EXCHANGE_RATES_TO_USD`.
 * @param amount - The amount in the recipient's currency to be converted.
 * @returns The equivalent amount in USD, rounded to two decimal places.
 *
 * Example:
 * ```
 * const usdAmount = convertToUSD('EUR', 100); // Converts 100 EUR to USD
 * ```
 */
export const convertToUSD = (
  recipientAccount: RecipientAccount,
  amount: number,
): number => {
  // Get the exchange rate for the specified recipient account
  const exchangeRate = EXCHANGE_RATES_TO_USD[recipientAccount];

  // Convert the amount from the recipient's currency to USD
  const amountInUSD = amount / exchangeRate;

  // Return the converted amount rounded to two decimal places
  return parseFloat(amountInUSD.toFixed(2));
};
