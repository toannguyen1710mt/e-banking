// Libs
import { render } from '@testing-library/react';

// Components
import { ServiceCardSkeleton } from '@/components';

describe('ServiceCardSkeleton component', () => {
  test('should match snapshot', () => {
    const container = render(<ServiceCardSkeleton />);

    expect(container).toMatchSnapshot();
  });
});
