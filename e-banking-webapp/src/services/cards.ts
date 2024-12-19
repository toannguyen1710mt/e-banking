// Constants
import { API_ENDPOINTS, TAGS } from '@/constants';

// Interfaces
import { ICard, SuccessResponse } from '@/interfaces';

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
