// Libs
import { render } from '@testing-library/react';

// Components
import { CardOverviewSkeleton } from '@/components';

describe('CardOverviewSkeleton component', () => {
  test('should match snapshot', () => {
    const container = render(<CardOverviewSkeleton />);

    expect(container).toMatchSnapshot();
  });
});
