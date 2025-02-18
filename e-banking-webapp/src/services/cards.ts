// Constants
import { API_ENDPOINTS, ERROR_MESSAGES, TAGS } from '@/constants';

// Interfaces
import {
  ICard,
  ICardsPayloadByAccount,
  IUser,
  ResponseData,
  SuccessResponse,
} from '@/interfaces';

// Services
import { httpClient } from './http-client';
import { getAccountsByUserId } from './account';

// Utils
import { toastManager } from '@/utils';

export const getListCardByAccountId = async (accountId: string) => {
  try {
    const { data: cardResult, ...rest } = await httpClient.get<
      SuccessResponse<ICard[]>
    >(`${API_ENDPOINTS.ACCOUNTS}/${accountId}?populate=cards`, {
      next: { tags: [TAGS.CARD] },
    });

    return {
      cards: cardResult?.data.cards || [],
      ...rest,
    };
  } catch (error) {
    toastManager.showToast(
      `${ERROR_MESSAGES.ERROR_GET_LIST_CARD_BY_ACCOUNT_ID} ${error}`,
      'error',
      'top-center',
    );

    return { cards: [], error: 'Failed to fetch cards' };
  }
};

/**
 * Fetches the list all card by token of user.
 * @param jwt - The token of the user.
 * @returns A list all card.
 */
export const getTotalCardsByUser = async (
  jwt: string,
): Promise<ResponseData<ICardsPayloadByAccount[]>> => {
  try {
    const requestEndpoint = `${API_ENDPOINTS.USERS}/me?populate[accounts][populate]=cards`;

    const { data } = await httpClient.get<ResponseData<IUser>>(
      requestEndpoint,
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      },
    );

    if (!data) {
      return [];
    }

    const accounts = data?.accounts || [];

    if (accounts.length) {
      const sortedCards = accounts
        .flatMap((account: { cards: ICard[]; type: string }) =>
          account.cards.map((card) => ({
            ...card,
            accountType: account.type,
          })),
        )
        .sort(
          (a: { createdAt: string }, b: { createdAt: string }) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        );

      return sortedCards;
    }

    return [];
  } catch (error) {
    toastManager.showToast(
      `${ERROR_MESSAGES.ERROR_GET_TOTAL_CARD_BY_USER} ${error}`,
      'error',
      'top-center',
    );

    throw new Error('Failed to fetch total cards');
  }
};

/**
 * Fetches the Main account of a user.
 * @param userId - The ID of the user.
 * @returns A Main card.
 */
export const getMainCardByUserId = async (userId: number) => {
  try {
    const accounts = await getAccountsByUserId(userId);

    const mainAccount = accounts.find((account) => account.type === 'Main');

    const requestEndpoint = `${API_ENDPOINTS.ACCOUNTS}/${mainAccount?.documentId}?populate=cards`;

    const { data } = await httpClient.get<SuccessResponse<ICard>>(
      requestEndpoint,
      {
        next: {
          tags: [API_ENDPOINTS.CARDS],
        },
      },
    );

    if (data?.data?.cards) {
      const result = data.data.cards.sort(
        (a: { createdAt: string }, b: { createdAt: string }) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
      );

      return result[0];
    }

    return {};
  } catch (error) {
    toastManager.showToast(
      `${ERROR_MESSAGES.ERROR_GET_MAIN_CARD_BY_USER_ID} ${error}`,
      'error',
      'top-center',
    );
  }
};
