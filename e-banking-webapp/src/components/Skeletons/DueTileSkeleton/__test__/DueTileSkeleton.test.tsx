// Libs
import { render } from '@testing-library/react';

// Components
import { DueTileSkeleton } from '@/components';

describe('DueTileSkeleton component', () => {
  test('should match snapshot', () => {
    const container = render(<DueTileSkeleton />);

    expect(container).toMatchSnapshot();
  });
});
