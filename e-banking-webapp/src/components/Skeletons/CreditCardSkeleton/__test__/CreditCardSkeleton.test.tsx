// Libs
import { render } from '@testing-library/react';

// Components
import { CreditCardSkeleton } from '@/components';

describe('CreditCardSkeleton component', () => {
  test('should match snapshot', () => {
    const container = render(<CreditCardSkeleton />);

    expect(container).toMatchSnapshot();
  });
});
