import { render, screen } from '@testing-library/react';
import { auth } from '@/config/auth';

// Layouts
import { HeaderAuth } from '..';

jest.mock('@/config/auth', () => ({
  auth: jest.fn(),
}));

jest.mock('@/layouts', () => ({
  Header: jest.fn(({ session }) => (
    <div>Mock Header: {session.user.username}</div>
  )),
}));

describe('HeaderAuth component', () => {
  it('renders the Header component when session exists', async () => {
    (auth as jest.Mock).mockResolvedValueOnce({
      user: { username: 'JohnDoe' },
    });

    render(await HeaderAuth());

    expect(await screen.findByText(/Mock Header: JohnDoe/)).toBeInTheDocument();
  });

  it('renders nothing when no session exists', async () => {
    (auth as jest.Mock).mockResolvedValueOnce(null);

    const { container } = render(await HeaderAuth());

    expect(container).toBeEmptyDOMElement();
  });
});
