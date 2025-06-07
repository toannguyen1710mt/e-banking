// Libs
import { z } from 'zod';

// Constants
import { ERROR_MESSAGES } from '@/constants';

export const futureMonth = z
  .string()
  .min(1, ERROR_MESSAGES.FIELD_REQUIRED)
  .refine(
    (value) => {
      const dateRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;

      if (!dateRegex.test(value)) return false;

      const [month, year] = value.split('/').map(Number);

      const fullYear = year + 2000;

      const currentYear = new Date().getFullYear();
      const currentMonth = new Date().getMonth() + 1;

      return (
        fullYear > currentYear ||
        (fullYear === currentYear && month > currentMonth)
      );
    },
    {
      message: ERROR_MESSAGES.EXPIRE_DATE_INVALID,
    },
  );
