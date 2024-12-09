import { render } from '@testing-library/react';

// Component
import { Slideshow } from '..';

describe('Slideshow component', () => {
  it('Should render snapshot correctly', () => {
    expect(render(<Slideshow onGetStarted={jest.fn()} />)).toMatchSnapshot();
  });
});
