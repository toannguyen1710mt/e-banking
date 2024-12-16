'use server';

// Libs
import { revalidateTag } from 'next/cache';

// Constants
import { API_ROUTES } from '@/constants';

// Interfaces
import { Transaction } from '@/interfaces';

// Services
import { httpClient } from '@/services';

export const createTransaction = async (
  transactionData: Omit<
    Transaction,
    'id' | 'documentId' | 'createdAt' | 'updatedAt' | 'publishedAt'
  >,
) => {
  await httpClient.post<Transaction>(API_ROUTES.TRANSACTIONS, {
    body: JSON.stringify({ data: transactionData }),
  });

  revalidateTag(API_ROUTES.TRANSACTIONS);
};
