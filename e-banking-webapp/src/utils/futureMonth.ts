// Libs
import { z } from 'zod';

// Constants
import { ERROR_MESSAGES } from '@/constants';

export const futureMonth = z.string().refine(
  (value) => {
    const dateRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;

    if (!dateRegex.test(value)) return false;

    const [month, year] = value.split('/').map(Number);

    const fullYear = year + 2000;

    const today = new Date();
    const inputDate = new Date(fullYear, month - 1);

    return (
      inputDate.getFullYear() > today.getFullYear() ||
      (inputDate.getFullYear() === today.getFullYear() &&
        inputDate.getMonth() >= today.getMonth())
    );
  },
  {
    message: ERROR_MESSAGES.EXPIRE_DATE_INVALID,
  },
);
