import { render } from '@testing-library/react';

// Components
import { NotFound } from '..';
import { ROUTES } from '@/constants';

describe('NotFound component', () => {
  let container: ReturnType<typeof render>;

  beforeEach(() => {
    container = render(<NotFound />);
  });
  it('Should match snapshot', () => {
    expect(container).toMatchSnapshot();
  });

  it('Should have a link pointing to the correct route', () => {
    const link = container.getByRole('link', { name: /Back to Home/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', ROUTES.HOME);
  });
});
