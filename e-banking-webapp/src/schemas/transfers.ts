// Libs
import { z } from 'zod';

// Constants
import { ERROR_MESSAGES, REGEX } from '@/constants';

// Interfaces
import { AccountType, GlobalType } from '@/interfaces';

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
      .min(12, { message: ERROR_MESSAGES.RECIPIENT_ACCOUNT_EXACT_12_DIGITS })
      .max(12, { message: ERROR_MESSAGES.RECIPIENT_ACCOUNT_EXACT_12_DIGITS })
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
  });
};

export const InternalTransferFormSchema = createTransferFormSchema(AccountType);
export const GlobalTransferFormSchema = createTransferFormSchema(GlobalType);
