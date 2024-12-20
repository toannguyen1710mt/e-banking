// Libs
import { z } from 'zod';

// Constants
import { ERROR_MESSAGES, REGEX } from '@/constants';

// Interfaces
import { AccountType, GlobalType } from '@/interfaces';

export const GlobalTransferFormSchema = z.object({
  fromAccountType: z
    .nativeEnum(AccountType, {
      errorMap: () => ({ message: ERROR_MESSAGES.FIELD_REQUIRED }),
    })
    .refine((val) => val !== undefined, {
      message: ERROR_MESSAGES.FIELD_REQUIRED,
    }),
  fromCountryType: z
    .nativeEnum(GlobalType, {
      errorMap: () => ({ message: ERROR_MESSAGES.FIELD_REQUIRED }),
    })
    .refine((val) => val !== undefined, {
      message: ERROR_MESSAGES.FIELD_REQUIRED,
    }),
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
  fromCardName: z.string(),
  fromAccountNumber: z.string(),
  fromAccountBalance: z.number(),
});
