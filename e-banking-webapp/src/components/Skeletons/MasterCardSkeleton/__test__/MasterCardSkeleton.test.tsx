// Libs
import { render } from '@testing-library/react';

// Components
import { MasterCardSkeleton } from '@/components';

describe('MasterCardSkeleton component', () => {
  test('should match snapshot', () => {
    const container = render(<MasterCardSkeleton />);

    expect(container).toMatchSnapshot();
  });
});
