// Libs
import { render } from '@testing-library/react';

// Components
import { ServiceCardListSkeleton } from '@/components';

describe('ServiceCardListSkeleton component', () => {
  test('should match snapshot', () => {
    const container = render(<ServiceCardListSkeleton />);

    expect(container).toMatchSnapshot();
  });
});
