// Libs
import { z } from 'zod';

// Constants
import { ERROR_MESSAGES, REGEX } from '@/constants';

// Interfaces
import { AccountType } from '@/interfaces';

const createTransferFormSchema = <T extends Record<string, string>>(
  accountEnum: T,
) => {
  const accountTypeValidator = () =>
    z
      .nativeEnum(accountEnum, {
        errorMap: () => ({ message: ERROR_MESSAGES.FIELD_REQUIRED }),
      })
      .refine((val) => val !== undefined, {
        message: ERROR_MESSAGES.FIELD_REQUIRED,
      });

  return z.object({
    fromAccountType: accountTypeValidator(),
    toAccountType: accountTypeValidator(),
    recipientAccount: z.coerce
      .string()
      .length(12, { message: ERROR_MESSAGES.RECIPIENT_ACCOUNT_EXACT_12_DIGITS })
      .regex(REGEX.NUMERIC_12_DIGITS, {
        message: ERROR_MESSAGES.RECIPIENT_ACCOUNT_ONLY_NUMBERS,
      }),
    amount: z.coerce
      .string()
      .min(1, ERROR_MESSAGES.FIELD_REQUIRED)
      .transform((val) => parseFloat(val))
      .refine((val) => val > 0.01, {
        message: ERROR_MESSAGES.AMOUNT_MIN,
      }),

    //Hidden fields
    fromAccountId: z.string(),
    toAccountId: z.string(),
    fromCardName: z.string(),
    toCardName: z.string(),
    fromAccountNumber: z.string(),
    toAccountNumber: z.string(),
    fromAccountBalance: z.number(),
    toAccountBalance: z.number(),
  });
};

export const InternalTransferFormSchema = createTransferFormSchema(AccountType);
