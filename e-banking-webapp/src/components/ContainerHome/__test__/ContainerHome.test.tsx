import { render } from '@testing-library/react';

// Component
import { ContainerHomepage } from '..';

describe('ContainerHome component', () => {
  it('Should render snapshot correctly.', () => {
    expect(render(<ContainerHomepage />)).toMatchSnapshot();
  });
});
