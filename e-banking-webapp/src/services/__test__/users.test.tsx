// Services
import { httpClient } from '@/services/http-client';
import { getUserById } from '../users';

// Constants
import { API_ENDPOINTS, TAGS } from '@/constants';

// Mocks
import { MOCK_DATA_USER } from '@/mocks';

jest.mock('@/services/http-client');

describe('getUserById', () => {
  const userId = 1;

  it('should fetch a user by ID and return the user data', async () => {
    (httpClient.get as jest.Mock).mockResolvedValueOnce({
      data: MOCK_DATA_USER,
      status: 200,
    });

    const result = await getUserById(userId);

    expect(httpClient.get).toHaveBeenCalledWith(
      `${API_ENDPOINTS.USERS}/${userId}`,
      {
        next: { tags: [TAGS.USERS] },
      },
    );

    expect(result).toEqual({
      user: MOCK_DATA_USER,
      status: 200,
    });
  });

  it('should return an empty user object if no data is returned', async () => {
    (httpClient.get as jest.Mock).mockResolvedValueOnce({
      data: null,
      status: 404,
    });

    const result = await getUserById(userId);

    expect(result).toEqual({
      user: {},
      status: 404,
    });
  });

  it('should throw an error if the request fails', async () => {
    const errorMessage = 'Request failed';
    (httpClient.get as jest.Mock).mockRejectedValueOnce(
      new Error(errorMessage),
    );

    await expect(getUserById(userId)).rejects.toThrow(errorMessage);
  });
});
