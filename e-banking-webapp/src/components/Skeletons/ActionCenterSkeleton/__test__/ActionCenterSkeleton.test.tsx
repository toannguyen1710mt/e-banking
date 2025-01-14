// Libs
import { render } from '@testing-library/react';

// Components
import { ActionCenterSkeleton } from '@/components';

describe('ActionCenterSkeleton component', () => {
  test('should match snapshot', () => {
    const container = render(<ActionCenterSkeleton />);

    expect(container).toMatchSnapshot();
  });
});
