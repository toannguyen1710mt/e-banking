// Libs
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

// Components
import { ActionCenter } from '..';

describe('ActionCenter component', () => {
  test('renders with correct data', () => {
    const { container } = render(<ActionCenter />);

    expect(container).toMatchSnapshot();
  });
});
