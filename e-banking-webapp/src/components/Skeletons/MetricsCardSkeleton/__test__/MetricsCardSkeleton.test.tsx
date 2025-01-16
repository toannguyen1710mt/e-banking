// Libs
import { render } from '@testing-library/react';

// Components
import { MetricsCardSkeleton } from '@/components';

describe('MetricsCardSkeleton component', () => {
  test('should match snapshot', () => {
    const container = render(<MetricsCardSkeleton />);

    expect(container).toMatchSnapshot();
  });
});
