'use server';

// Libs
import { revalidateTag } from 'next/cache';

// Constants
import { API_ENDPOINTS, ERROR_MESSAGES } from '@/constants';

// Interfaces
import { IAccountPayloadData } from '@/interfaces';

// Services
import { httpClient } from '@/services';

export const updateAccountInfo = async (
  accountDocumentId: string,
  accountData: IAccountPayloadData,
) => {
  try {
    await httpClient.put(`${API_ENDPOINTS.ACCOUNTS}/${accountDocumentId}`, {
      data: accountData,
    });

    revalidateTag(API_ENDPOINTS.ACCOUNTS);
  } catch (error) {
    throw new Error(ERROR_MESSAGES.ERROR_UPDATE_ACCOUNT_INFO + error);
  }
};
