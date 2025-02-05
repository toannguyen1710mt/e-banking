import { render, screen } from '@testing-library/react';

// Constants
import { ROUTES } from '@/constants';

// Components
import { Error } from '..';

describe('Error component', () => {
  let container: ReturnType<typeof render>;

  beforeEach(() => {
    container = render(<Error />);
  });

  it('Should renders the error image', () => {
    const errorImage = screen.getByAltText('Server Error');
    expect(errorImage).toBeInTheDocument();
  });

  it('Should renders default error message when no message is provided', () => {
    expect(screen.getByText('Oops! Something went wrong.')).toBeInTheDocument();
    expect(
      screen.getByText(
        'We encountered an issue while processing your request. Please try again later.',
      ),
    ).toBeInTheDocument();
  });

  it('Should renders link to home page when no onReset prop is provided', () => {
    expect(container.getByText('Go to Home Page')).toBeInTheDocument();
  });

  it('Should renders link to home page with correct href', () => {
    const link = container.getByText('Go to Home Page');
    expect(link).toHaveAttribute('href', ROUTES.HOME);
  });
});
