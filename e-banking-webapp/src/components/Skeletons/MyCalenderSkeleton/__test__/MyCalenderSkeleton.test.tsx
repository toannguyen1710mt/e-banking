// Libs
import { render } from '@testing-library/react';

// Components
import { MyCalenderSkeleton } from '@/components';

describe('MyCalenderSkeleton component', () => {
  test('should match snapshot', () => {
    const container = render(<MyCalenderSkeleton />);

    expect(container).toMatchSnapshot();
  });
});
