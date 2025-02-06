// Constants
import { ERROR_MESSAGES } from '@/constants';

// Services
import { httpClient } from '..';

global.fetch = jest.fn();

describe('ApiService', () => {
  const mockUrl = '/test-endpoint';
  const fetchMock = fetch as jest.Mock;
  const mockData = { key: 'value' };
  const mockPagination = {
    total: 100,
    per_page: 10,
    current_page: 1,
    total_pages: 10,
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('get', () => {
    it('should handle successful GET request', async () => {
      fetchMock.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          data: mockData,
          meta: { pagination: mockPagination },
        }),
      });
      const response = await httpClient.get(mockUrl);
      expect(response).toEqual({
        data: { data: mockData, meta: { pagination: mockPagination } },
        pagination: mockPagination,
        error: undefined,
      });
    });
    it('should handle GET request error', async () => {
      fetchMock.mockResolvedValueOnce({
        ok: false,
        status: 500,
        statusText: 'Internal Server Error',
        json: async () => ({}),
      });
      await expect(httpClient.get(mockUrl)).rejects.toThrow(
        `${ERROR_MESSAGES.NETWORK_ERROR}: 500 Internal Server Error`,
      );
    });
  });

  describe('post', () => {
    it('should handle successful POST request', async () => {
      fetchMock.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          data: mockData,
          meta: { pagination: mockPagination },
        }),
      });
      const response = await httpClient.post(mockUrl, mockData);
      expect(response).toEqual({
        data: { data: mockData, meta: { pagination: mockPagination } },
        pagination: mockPagination,
        error: undefined,
      });
    });
    it('should handle POST request error', async () => {
      fetchMock.mockResolvedValueOnce({
        ok: false,
        status: 500,
        statusText: 'Internal Server Error',
        json: async () => ({
          error: 'Error message',
        }),
      });
      await expect(httpClient.post(mockUrl, mockData)).resolves.toEqual(
        'Error message',
      );
    });

    it('should handle POST request error', async () => {
      fetchMock.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => ({ meta: null }),
      });
      await expect(httpClient.post(mockUrl, mockData)).resolves.toEqual({
        error: undefined,
        pagination: null,
        data: {
          meta: null,
        },
      });
    });
  });

  describe('put', () => {
    it('should handle successful PUT request', async () => {
      fetchMock.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          data: mockData,
          meta: { pagination: mockPagination },
        }),
      });
      const response = await httpClient.put(mockUrl, mockData);
      expect(response).toEqual({
        data: { data: mockData, meta: { pagination: mockPagination } },
        pagination: mockPagination,
        error: undefined,
      });
    });
    it('should handle PUT request error', async () => {
      fetchMock.mockResolvedValueOnce({
        ok: false,
        status: 500,
        statusText: 'Internal Server Error',
        json: async () => ({}),
      });
      await expect(httpClient.put(mockUrl, mockData)).rejects.toThrow(
        `${ERROR_MESSAGES.NETWORK_ERROR}: 500 Internal Server Error`,
      );
    });
  });

  describe('delete', () => {
    it('should handle successful DELETE request', async () => {
      fetchMock.mockResolvedValueOnce({
        ok: true,
        status: 204,
        json: async () => ({}),
      });
      const response = await httpClient.delete(mockUrl);
      expect(response).toEqual({});
    });
    it('should handle DELETE request error', async () => {
      fetchMock.mockResolvedValueOnce({
        ok: false,
        status: 500,
        statusText: 'Internal Server Error',
        json: async () => ({}),
      });
      await expect(httpClient.delete(mockUrl)).rejects.toThrow(
        `${ERROR_MESSAGES.NETWORK_ERROR}: 500 Internal Server Error`,
      );
    });
  });
});
