// Constants
import { API_ENDPOINTS, TAGS } from '@/constants';

// Interfaces
import { ICard, ICardsPayloadByAccount, SuccessResponse } from '@/interfaces';

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

export const getTotalCardsByAccounts = async (query: string) => {
  const { data: result, ...rest } = await httpClient.get<
    SuccessResponse<ICardsPayloadByAccount[]>
  >(
    `${query ? `${API_ENDPOINTS.CARDS}?populate=account&${query}&sort=createdAt:desc` : ''}`,
    {
      next: { tags: [TAGS.CARD] },
    },
  );

  return {
    totalCard: result?.data || [],
    ...rest,
  };
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
      (
        a: { createdAt: string | number | Date },
        b: { createdAt: string | number | Date },
      ) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
    );

    return result[0];
  }

  return {};
};
