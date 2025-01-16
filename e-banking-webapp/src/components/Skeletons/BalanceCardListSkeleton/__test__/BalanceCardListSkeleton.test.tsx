// Libs
import { render } from '@testing-library/react';

// Components
import { BalanceCardListSkeleton } from '@/components';

describe('BalanceCardListSkeleton component', () => {
  test('should match snapshot', () => {
    const container = render(<BalanceCardListSkeleton />);

    expect(container).toMatchSnapshot();
  });
});
