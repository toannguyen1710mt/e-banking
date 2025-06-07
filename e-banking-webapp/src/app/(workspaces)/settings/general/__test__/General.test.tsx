import { render } from '@testing-library/react';
import { auth } from '@/config/auth';

import GeneralPage from '../page';
import { getUser } from '@/actions';
import { General } from '@/components';

jest.mock('@/config/auth');
jest.mock('@/actions');
jest.mock('@/components', () => ({
  General: jest.fn(() => <div data-testid='general-component' />),
}));

describe('GeneralPage', () => {
  const mockSession = { user: { id: 123, email: 'test@example.com' } };
  const mockUser = { id: 123, name: 'John Doe', email: 'test@example.com' };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch session and user data, then render General component', async () => {
    (auth as jest.Mock).mockResolvedValue(mockSession);
    (getUser as jest.Mock).mockResolvedValue(mockUser);

    render(await GeneralPage());

    expect(auth).toHaveBeenCalledTimes(1);
    expect(getUser).toHaveBeenCalledWith(123);

    expect(General).toHaveBeenCalledTimes(1);
    expect(General).toHaveBeenCalledWith(
      expect.objectContaining({
        user: mockUser,
      }),
      undefined,
    );
  });
});
