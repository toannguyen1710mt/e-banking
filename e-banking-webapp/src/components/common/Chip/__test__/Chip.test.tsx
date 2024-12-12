import { render } from '@testing-library/react';

// Component
import { Chip } from '..';

describe('Chip component', () => {
  it('Should render snapshot correctly', () => {
    expect(render(<Chip text='Success' />)).toMatchSnapshot();
  });
});
