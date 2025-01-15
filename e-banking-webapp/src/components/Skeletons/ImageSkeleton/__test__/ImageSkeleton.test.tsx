// Libs
import { render } from '@testing-library/react';

// Components
import { ImageSkeleton } from '@/components';

describe('ImageSkeleton component', () => {
  test('should match snapshot', () => {
    const container = render(<ImageSkeleton />);

    expect(container).toMatchSnapshot();
  });
});
