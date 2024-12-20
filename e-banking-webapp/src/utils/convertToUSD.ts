// Constants
import { EXCHANGE_RATES_TO_USD } from '@/constants';

type RecipientAccount = keyof typeof EXCHANGE_RATES_TO_USD;

export const convertToUSD = (
  recipientAccount: RecipientAccount,
  amount: number,
): number => {
  const exchangeRate = EXCHANGE_RATES_TO_USD[recipientAccount];

  // Convert amount to USD
  const amountInUSD = amount / exchangeRate;

  return parseFloat(amountInUSD.toFixed(2));
};
