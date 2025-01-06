// Constants
import { API_ENDPOINTS, TAGS } from '@/constants';

// Interfaces
import { ICard, ICardsPayloadByAccount, SuccessResponse } from '@/interfaces';

// Services
import { httpClient } from './http-client';

export const getCardById = async (id: string) => {
  const { data: cardResult, ...rest } = await httpClient.get<
    SuccessResponse<ICard>
  >(`${API_ENDPOINTS.ACCOUNTS}/${id}?populate=cards`, {
    next: { tags: [TAGS.CARD] },
  });

  return {
    card: cardResult?.data as ICard,
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
    totalCard: result?.data as ICardsPayloadByAccount[],
    ...rest,
  };
};
