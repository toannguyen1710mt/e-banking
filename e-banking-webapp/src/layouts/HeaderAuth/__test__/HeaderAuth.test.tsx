import { HeaderAuth } from '@/layouts';

describe('HeaderAuth', () => {
  it('should return undefined if there is no session', async () => {
    const authMock = jest.fn(() => Promise.resolve(null));

    authMock.mockResolvedValueOnce(null);

    const result = await HeaderAuth();

    expect(result).toMatchSnapshot();
  });
});
