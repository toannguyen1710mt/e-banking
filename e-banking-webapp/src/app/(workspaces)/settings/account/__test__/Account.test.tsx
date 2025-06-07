import { auth } from '@/config/auth';
import { render } from '@testing-library/react';
import AccountPage from '../page';
import { Account } from '@/components';

jest.mock('@/config/auth', () => ({
  auth: jest.fn(),
}));

jest.mock('@/components', () => ({
  Account: jest.fn(() => <div>Mock Account Component</div>),
}));

describe('AccountPage', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch session and render Account component when session is available', async () => {
    const mockSession = { user: { id: '123', email: 'test@example.com' } };
    (auth as jest.Mock).mockResolvedValue(mockSession);

    const { findByText } = render(await AccountPage());

    expect(auth).toHaveBeenCalledTimes(1);
    expect(Account).toHaveBeenCalledWith(
      expect.objectContaining({ session: mockSession }),
      undefined,
    );

    expect(await findByText('Mock Account Component')).toBeInTheDocument();
  });

  it('should return nothing when session is null', async () => {
    (auth as jest.Mock).mockResolvedValue(null);

    const { container } = render(await AccountPage());

    expect(auth).toHaveBeenCalledTimes(1);
    expect(Account).not.toHaveBeenCalled();
    expect(container).toBeEmptyDOMElement();
  });
});
