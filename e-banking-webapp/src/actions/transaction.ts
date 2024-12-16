'use server';

// Libs
import { revalidateTag } from 'next/cache';

// Constants

// Interfaces
import { ITransaction, TransactionCreateData } from '@/interfaces';

// Services
import { httpClient } from '@/services';
import { API_ENDPOINTS } from '@/constants';

export const createTransaction = async (
  transactionData: TransactionCreateData,
) => {
  await httpClient.post<ITransaction>(API_ENDPOINTS.TRANSACTIONS, {
    body: JSON.stringify({ data: transactionData }),
  });

  revalidateTag(API_ENDPOINTS.TRANSACTIONS);
};
