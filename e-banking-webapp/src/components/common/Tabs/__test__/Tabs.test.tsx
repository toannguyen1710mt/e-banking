// Libs
import { render } from '@testing-library/react';

// Components
import { TabsCustom } from '@/components';

describe('TabsCustom Component', () => {
  test('renders correctly and matches snapshot', () => {
    const { container } = render(<TabsCustom />);
    expect(container).toMatchSnapshot();
  });
});
