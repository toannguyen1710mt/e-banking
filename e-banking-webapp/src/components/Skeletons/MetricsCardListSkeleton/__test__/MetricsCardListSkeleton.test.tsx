// Libs
import { render } from '@testing-library/react';

// Components
import { MetricsCardListSkeleton } from '@/components';

describe('MetricsCardListSkeleton component', () => {
  test('should match snapshot', () => {
    const container = render(<MetricsCardListSkeleton />);

    expect(container).toMatchSnapshot();
  });
});
