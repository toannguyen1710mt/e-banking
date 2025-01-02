// Libs
import { render } from '@testing-library/react';

// Components
import { ChartsSkeleton } from '@/components';

describe('ChartsSkeleton component', () => {
  test('should match snapshot', () => {
    const container = render(<ChartsSkeleton />);

    expect(container).toMatchSnapshot();
  });
});
