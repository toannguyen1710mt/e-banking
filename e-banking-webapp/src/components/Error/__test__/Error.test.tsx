import { render } from '@testing-library/react';

// Constants
import { ROUTES } from '@/constants';

// Components
import { Error } from '..';

describe('Error component', () => {
  let container: ReturnType<typeof render>;

  beforeEach(() => {
    container = render(<Error />);
  });
  it('renders error message', () => {
    const message = 'Test error message';

    const { getByText } = render(<Error message={message} />);

    expect(getByText(/Test error message/i)).toBeInTheDocument();
  });

  it('renders default error message when no message is provided', () => {
    expect(
      container.getByText(/We apologize for the inconvenience/i),
    ).toBeInTheDocument();
  });

  it('renders link to home page when no onReset prop is provided', () => {
    expect(container.getByText('Go to Home Page')).toBeInTheDocument();
  });

  it('renders link to home page with correct href', () => {
    const link = container.getByText('Go to Home Page');
    expect(link).toHaveAttribute('href', ROUTES.HOME);
  });
});
