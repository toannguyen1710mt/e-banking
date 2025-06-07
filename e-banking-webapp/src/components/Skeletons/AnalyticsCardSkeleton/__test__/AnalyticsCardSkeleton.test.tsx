// Libs
import { render } from '@testing-library/react';

// Components
import { AnalyticsCardSkeleton } from '@/components';

describe('AnalyticsCardSkeleton component', () => {
  test('should match snapshot', () => {
    const container = render(<AnalyticsCardSkeleton />);

    expect(container).toMatchSnapshot();
  });
});
