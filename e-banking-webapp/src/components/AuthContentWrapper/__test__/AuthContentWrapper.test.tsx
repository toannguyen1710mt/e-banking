import { render } from '@testing-library/react';
import { usePathname } from 'next/navigation';

// Constants
import { ROUTES } from '@/constants';

// Components
import { AuthContentWrapper } from '..';

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}));

describe('AuthContentWrapper component', () => {
  const mockUsePathname = usePathname as jest.Mock;

  it('Should render snapshot correctly.', () => {
    const props = {
      formContent: <>Form</>,
      textHeading: 'Good To See You Again!',
      textFooter: 'Don’t have an account?',
    };

    expect(render(<AuthContentWrapper {...props} />)).toMatchSnapshot();
  });

  it('Should display the correct heading and footer text.', () => {
    mockUsePathname.mockReturnValue(ROUTES.SIGN_IN);
    const props = {
      formContent: <>Form</>,
      textHeading: 'Welcome Back!',
      textFooter: 'Don’t have an account?',
    };

    const { getByRole, getByText } = render(<AuthContentWrapper {...props} />);

    expect(getByRole('heading', { level: 1 })).toHaveTextContent(
      'Welcome Back!',
    );
    expect(getByText('Don’t have an account?')).toBeInTheDocument();
  });
});
