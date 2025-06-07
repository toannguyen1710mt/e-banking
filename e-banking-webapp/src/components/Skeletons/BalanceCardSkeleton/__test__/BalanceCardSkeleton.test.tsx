// Libs
import { render } from '@testing-library/react';

// Components
import { BalanceCardSkeleton } from '@/components';

describe('BalanceCardSkeleton component', () => {
  test('should match snapshot', () => {
    const container = render(<BalanceCardSkeleton />);

    expect(container).toMatchSnapshot();
  });
});
