'use server';

// Libs
import { revalidateTag } from 'next/cache';

// Constants
import { API_ENDPOINTS } from '@/constants';

// Interfaces
import { IAccountPayloadData } from '@/interfaces';

// Services
import { httpClient } from '@/services';

export const updateAccountInfo = async (
  accountDocumentId: string,
  accountData: IAccountPayloadData,
) => {
  await httpClient.put(`${API_ENDPOINTS.ACCOUNTS}/${accountDocumentId}`, {
    data: accountData,
  });

  revalidateTag(API_ENDPOINTS.ACCOUNTS);
};
