import { httpClient } from '../http-client';

// Constants
import { API_ENDPOINTS, TAGS } from '@/constants';

// Services
import {
  getListCardByAccountId,
  getMainCardByUserId,
  getTotalCardsByUser,
} from '../cards';
import { getAccountsByUserId } from '../account';

jest.mock('@/services/http-client', () => ({
  httpClient: {
    get: jest.fn(),
  },
}));

jest.mock('@/services/account', () => ({
  getAccountsByUserId: jest.fn(),
}));

const mockCardResponse = {
  data: {
    cards: [
      {
        id: '1',
        cardNumber: '1234 5678 9012 3456',
        cardType: 'Visa',
      },
      {
        id: '2',
        cardNumber: '9876 5432 1098 7654',
        cardType: 'MasterCard',
      },
    ],
  },
  meta: {},
};

const mockUserResponse = {
  data: {
    id: 'user123',
    accounts: [
      {
        type: 'Saving',
        cards: [
          {
            id: '1',
            cardNumber: '1111 2222 3333 4444',
            createdAt: '2024-01-01T12:00:00Z',
          },
          {
            id: '2',
            cardNumber: '5555 6666 7777 8888',
            createdAt: '2024-01-02T12:00:00Z',
          },
        ],
      },
    ],
  },
};

describe('Cards Services', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getListCardByAccountId', () => {
    it('Should return cards list when API call is successful', async () => {
      (httpClient.get as jest.Mock).mockResolvedValue({
        data: mockCardResponse,
        status: 200,
      });

      const accountId = '123';
      const response = await getListCardByAccountId(accountId);

      expect(httpClient.get).toHaveBeenCalledWith(
        `${API_ENDPOINTS.ACCOUNTS}/${accountId}?populate=cards`,
        { next: { tags: [TAGS.CARD] } },
      );

      expect(response.cards).toEqual(mockCardResponse.data.cards);
      expect(response.status).toBe(200);
    });

    it('Should return empty cards array when API response has no cards', async () => {
      (httpClient.get as jest.Mock).mockResolvedValue({
        data: { data: { cards: [] } },
        status: 200,
      });

      const accountId = '456';
      const response = await getListCardByAccountId(accountId);

      expect(httpClient.get).toHaveBeenCalledWith(
        `${API_ENDPOINTS.ACCOUNTS}/${accountId}?populate=cards`,
        { next: { tags: [TAGS.CARD] } },
      );

      expect(response.cards).toEqual([]);
      expect(response.status).toBe(200);
    });
  });

  describe('getTotalCardsByUser', () => {
    it('Should return sorted list of cards by createdAt date', async () => {
      (httpClient.get as jest.Mock).mockResolvedValue({
        data: mockUserResponse.data,
        status: 200,
      });

      const jwtToken = 'mock-jwt-token';
      const response = await getTotalCardsByUser(jwtToken);

      expect(httpClient.get).toHaveBeenCalledWith(
        `${API_ENDPOINTS.USERS}/me?populate[accounts][populate]=cards`,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        },
      );

      expect(response).toEqual([
        {
          id: '2',
          cardNumber: '5555 6666 7777 8888',
          createdAt: '2024-01-02T12:00:00Z',
          accountType: 'Saving',
        },
        {
          id: '1',
          cardNumber: '1111 2222 3333 4444',
          createdAt: '2024-01-01T12:00:00Z',
          accountType: 'Saving',
        },
      ]);
    });

    it('Should return empty array when no data is available', async () => {
      (httpClient.get as jest.Mock).mockResolvedValue({
        data: null,
        status: 200,
      });

      const jwtToken = 'mock-jwt-token';
      const response = await getTotalCardsByUser(jwtToken);

      expect(response).toEqual([]);
    });

    it('Should return empty array when accounts list is empty', async () => {
      (httpClient.get as jest.Mock).mockResolvedValue({
        data: { accounts: [] },
        status: 200,
      });

      const jwtToken = 'mock-jwt-token';
      const response = await getTotalCardsByUser(jwtToken);

      expect(response).toEqual([]);
    });

    it('Should handle API errors ', async () => {
      (httpClient.get as jest.Mock).mockRejectedValue(
        new Error('Network Error'),
      );

      const jwtToken = 'mock-jwt-token';

      await expect(getTotalCardsByUser(jwtToken)).rejects.toThrow(
        'Network Error',
      );
    });
  });

  describe('getMainCardByUserId', () => {
    it('should return the most recent card from the main account', async () => {
      const userId = 123;

      (getAccountsByUserId as jest.Mock).mockResolvedValue([
        { type: 'Main', documentId: 'main-account-id' },
        { type: 'Secondary', documentId: 'secondary-account-id' },
      ]);

      (httpClient.get as jest.Mock).mockResolvedValue({
        data: {
          data: {
            cards: [
              { createdAt: '2025-01-01T10:00:00Z', cardId: 'card-1' },
              { createdAt: '2025-01-02T10:00:00Z', cardId: 'card-2' },
            ],
          },
        },
      });

      const result = await getMainCardByUserId(userId);

      expect(result).toEqual({
        createdAt: '2025-01-01T10:00:00Z',
        cardId: 'card-1',
      });
    });

    it('Should return an empty object when the main account has no cards', async () => {
      const mockUserId = 1;
      const mockAccounts = [{ type: 'Main', documentId: '123', cards: [] }];
      (getAccountsByUserId as jest.Mock).mockResolvedValue(mockAccounts);
      const mockCardResponse = {
        data: { cards: [] },
      };
      (httpClient.get as jest.Mock).mockResolvedValue(mockCardResponse);

      const result = await getMainCardByUserId(mockUserId);

      expect(result).toEqual({});
      expect(getAccountsByUserId).toHaveBeenCalledWith(mockUserId);
      expect(httpClient.get).toHaveBeenCalledWith(
        `${API_ENDPOINTS.ACCOUNTS}/123?populate=cards`,
        expect.any(Object),
      );
    });
  });
});
