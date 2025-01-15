// Libs
import { render } from '@testing-library/react';

// Component
import { SubMenu } from '@/components';

describe('SubMenu component', () => {
  it('Should render snapshot correctly', () => {
    expect(render(<SubMenu />)).toMatchSnapshot();
  });
});
