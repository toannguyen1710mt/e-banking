// Libs
import { z } from 'zod';

// Constants
import { ERROR_MESSAGES } from '@/constants';

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
    internalTransfer: z.object({
      fromAccountType: accountTypeValidator(),
      toAccountType: accountTypeValidator(),
      amount: z.coerce
        .string()
        .min(1, ERROR_MESSAGES.FIELD_REQUIRED)
        .transform((val) => parseFloat(val))
        .refine((val) => val > 0.01, {
          message: ERROR_MESSAGES.AMOUNT_MIN,
        }),
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
