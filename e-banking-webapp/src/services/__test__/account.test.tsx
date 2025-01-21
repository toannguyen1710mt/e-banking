// Services
import { getAccountsByUserId, getGlobalAccounts, httpClient } from '@/services';

// Constants
import { API_ENDPOINTS } from '@/constants';

// Mocks
import { MOCK_DATA_USER } from '@/mocks';

jest.mock('@/services/http-client');

describe('getAccountsByUserId', () => {
  const userId = 1;

  it('should fetch accounts for the given user ID and return them', async () => {
    (httpClient.get as jest.Mock).mockResolvedValueOnce({
      data: MOCK_DATA_USER,
      status: 200,
    });

    const result = await getAccountsByUserId(userId);

    expect(httpClient.get).toHaveBeenCalledWith(
      `${API_ENDPOINTS.USERS}/${userId}?populate=accounts`,
    );

    expect(result).toEqual(MOCK_DATA_USER.accounts);
  });

  it('should return an empty array if the user has no accounts', async () => {
    (httpClient.get as jest.Mock).mockResolvedValueOnce({
      data: { ...MOCK_DATA_USER, accounts: null },
      status: 200,
    });

    const result = await getAccountsByUserId(userId);

    expect(result).toEqual([]);
  });

  it('should return an empty array if no data is returned', async () => {
    (httpClient.get as jest.Mock).mockResolvedValueOnce({
      data: null,
      status: 404,
    });

    const result = await getAccountsByUserId(userId);

    expect(result).toEqual([]);
  });

  it('should throw an error if the API call fails', async () => {
    const errorMessage = 'Request failed';
    (httpClient.get as jest.Mock).mockRejectedValueOnce(
      new Error(errorMessage),
    );

    await expect(getAccountsByUserId(userId)).rejects.toThrow(errorMessage);
  });
});

const mockGlobalAccounts = [
  {
    id: 1,
    name: 'Global Account 1',
    currency: 'USD',
    balance: 1000,
  },
  {
    id: 2,
    name: 'Global Account 2',
    currency: 'EUR',
    balance: 2000,
  },
];

describe('getGlobalAccounts', () => {
  it('should fetch and return global accounts successfully', async () => {
    (httpClient.get as jest.Mock).mockResolvedValue({
      data: mockGlobalAccounts,
    });

    const result = await getGlobalAccounts();

    expect(httpClient.get).toHaveBeenCalledWith(API_ENDPOINTS.GLOBAL_ACCOUNTS);
    expect(result).toEqual(mockGlobalAccounts);
  });

  it('should throw an error when the API call fails', async () => {
    const errorMessage = 'API call failed';
    (httpClient.get as jest.Mock).mockRejectedValue(new Error(errorMessage));

    await expect(getGlobalAccounts()).rejects.toThrow(errorMessage);
    expect(httpClient.get).toHaveBeenCalledWith(API_ENDPOINTS.GLOBAL_ACCOUNTS);
  });
});
