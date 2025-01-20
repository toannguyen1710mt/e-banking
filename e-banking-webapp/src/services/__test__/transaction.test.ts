// Constants
import { API_ENDPOINTS } from '@/constants';

// Mocks
import { MOCK_DATA_USER } from '@/mocks';

// Services
import { getAccountsByUserId, httpClient } from '@/services';
import { getTransactionsByUserId } from '@/services/transaction';

// Utils
import { formatQueryParams } from '@/utils/query-params';

jest.mock('@/services', () => ({
  getAccountsByUserId: jest.fn(),
  httpClient: {
    get: jest.fn(),
  },
}));

jest.mock('@/utils/query-params', () => ({
  formatQueryParams: jest.fn(),
}));

describe('getTransactionByUserId', () => {
  const mockResponseData = {
    data: MOCK_DATA_USER,
    meta: {
      pagination: {
        page: 1,
        pageSize: 25,
        pageCount: 1,
        total: 15,
      },
    },
  };

  it('should fetch transactions for a user with provided userId and queryParams', async () => {
    const queryParams = { pagination: { page: 1, limit: 10 } };
    const queryString = 'pagination%5Bpage%5D=1&pagination%5Blimit%5D=10';

    (getAccountsByUserId as jest.Mock).mockResolvedValue(
      MOCK_DATA_USER.accounts,
    );
    (formatQueryParams as jest.Mock).mockReturnValue(queryString);
    (httpClient.get as jest.Mock).mockResolvedValue(mockResponseData);

    const result = await getTransactionsByUserId(
      MOCK_DATA_USER.id,
      queryParams,
    );

    // Verify mock calls
    expect(getAccountsByUserId).toHaveBeenCalledWith(MOCK_DATA_USER.id);
    expect(formatQueryParams).toHaveBeenCalledWith(queryParams);
    expect(httpClient.get).toHaveBeenCalledWith(
      expect.stringContaining(API_ENDPOINTS.TRANSACTIONS),
      expect.any(Object),
    );

    expect(result).toEqual(mockResponseData.data);
  });

  it('should construct URL with queryString when queryParams are provided', async () => {
    const queryParams = { pagination: { page: 1, limit: 10 } };
    const queryString = 'pagination%5Bpage%5D=1&pagination%5Blimit%5D=10';

    (getAccountsByUserId as jest.Mock).mockResolvedValue(
      MOCK_DATA_USER.accounts,
    );
    (formatQueryParams as jest.Mock).mockReturnValue(queryString);
    (httpClient.get as jest.Mock).mockResolvedValue(mockResponseData);

    await getTransactionsByUserId(MOCK_DATA_USER.id, queryParams);

    // Verify URL contains both baseEndpoint and queryString
    expect(httpClient.get).toHaveBeenCalledWith(
      expect.stringContaining(`${API_ENDPOINTS.TRANSACTIONS}?populate=account`),
      expect.any(Object),
    );
    expect(httpClient.get).toHaveBeenCalledWith(
      expect.stringContaining(queryString),
      expect.any(Object),
    );
  });

  it('should use baseEndpoint with default pagination params from Strapi when no queryString is present', async () => {
    (getAccountsByUserId as jest.Mock).mockResolvedValue(
      MOCK_DATA_USER.accounts,
    );
    (formatQueryParams as jest.Mock).mockReturnValue('');
    (httpClient.get as jest.Mock).mockResolvedValue(mockResponseData);

    await getTransactionsByUserId(MOCK_DATA_USER.id);

    // Verify URL contains correct baseEndpoint with filters
    const callArg = (httpClient.get as jest.Mock).mock.calls[0][0];

    // Verify basic structure
    expect(callArg).toMatch(
      new RegExp(`^${API_ENDPOINTS.TRANSACTIONS}\\?populate=account`),
    );

    // Verify it contains all document IDs from accounts
    if (MOCK_DATA_USER.accounts) {
      MOCK_DATA_USER.accounts.forEach((account) => {
        expect(callArg).toContain(account.documentId);
      });
    }

    // Verify it doesn't contain any undefined values
    expect(callArg).not.toContain('undefined');
    expect(callArg).not.toContain('null');

    // Verify it matches the expected baseEndpoint exactly
    const expectedBaseEndpoint = `${API_ENDPOINTS.TRANSACTIONS}?populate=account&[filters][account][documentId][$containsi]=${MOCK_DATA_USER.accounts?.[0].documentId}&[filters][account][documentId][$containsi]=${MOCK_DATA_USER.accounts?.[1].documentId}&[filters][account][documentId][$containsi]=${MOCK_DATA_USER.accounts?.[2].documentId}&pagination%5Bpage%5D=1&pagination%5Blimit%5D=10`;
    expect(callArg).toBe(expectedBaseEndpoint);
  });

  it('should handle errors from getAccountsByUserId', async () => {
    const error = new Error('Failed to fetch accounts');
    (getAccountsByUserId as jest.Mock).mockRejectedValue(error);

    await expect(getTransactionsByUserId(MOCK_DATA_USER.id)).rejects.toThrow(
      'Failed to fetch accounts',
    );
  });
});
