'use server';

// Libs
import { revalidateTag } from 'next/cache';

// Constants
import { API_ENDPOINTS } from '@/constants';

// Interfaces
import { ITransaction, TransactionCreateData } from '@/interfaces';

// Services
import { httpClient } from '@/services';

export const createTransaction = async (
  transactionData: TransactionCreateData,
) => {
  await httpClient.post<ITransaction>(API_ENDPOINTS.TRANSACTIONS, {
    data: transactionData,
  });

  revalidateTag(API_ENDPOINTS.TRANSACTIONS);
};
