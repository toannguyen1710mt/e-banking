// Libs
import { z } from 'zod';

// Constants
import { ERROR_MESSAGES } from '@/constants';

export const futureMonth = z.string().refine(
  (value) => {
    if (!value) return false;

    const [year, month] = value.split('/').map(Number);
    if (!year || !month) return false;

    const today = new Date();
    const inputDate = new Date(year, month - 1);

    if (year === today.getFullYear() && month === today.getMonth() + 1) {
      return true;
    }

    return inputDate > today;
  },
  {
    message: ERROR_MESSAGES.EXPIRE_DATE_INVALID,
  },
);
