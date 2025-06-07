'use server';

// Libs
import { revalidateTag } from 'next/cache';

// Constants
import { API_ENDPOINTS, ERROR_MESSAGES } from '@/constants';

// Interfaces
import { ITransaction, TransactionCreateData } from '@/interfaces';

// Services
import { httpClient } from '@/services';

export const createTransaction = async (
  accountId: string,
  transactionData: TransactionCreateData,
) => {
  try {
    await httpClient.post<ITransaction>(API_ENDPOINTS.TRANSACTIONS, {
      data: {
        ...transactionData,
        account: {
          connect: [accountId],
        },
      },
    });

    revalidateTag(API_ENDPOINTS.TRANSACTIONS);
  } catch (error) {
    throw new Error(ERROR_MESSAGES.ERROR_CREATE_TRANSACTION + error);
  }
};
