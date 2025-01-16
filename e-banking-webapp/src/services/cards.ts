// Constants
import { API_ENDPOINTS, TAGS } from '@/constants';

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

export const getListCardByAccountId = async (accountId: string) => {
  const { data: cardResult, ...rest } = await httpClient.get<
    SuccessResponse<ICard[]>
  >(`${API_ENDPOINTS.ACCOUNTS}/${accountId}?populate=cards`, {
    next: { tags: [TAGS.CARD] },
  });

  return {
    cards: cardResult?.data.cards || [],
    ...rest,
  };
};

/**
 * Fetches the list all card by token of user.
 * @param jwt - The token of the user.
 * @returns A list all card.
 */
export const getTotalCardsByUser = async (
  jwt: string,
): Promise<ResponseData<ICardsPayloadByAccount[]>> => {
  const requestEndpoint = `${API_ENDPOINTS.USERS}/me?populate[accounts][populate]=cards`;

  const { data } = await httpClient.get<ResponseData<IUser>>(requestEndpoint, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });

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
};

/**
 * Fetches the Main account of a user.
 * @param userId - The ID of the user.
 * @returns A Main card.
 */
export const getMainCardByUserId = async (userId: number) => {
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
};
