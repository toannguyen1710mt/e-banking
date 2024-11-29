import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import Home from '../page';

describe('Home', () => {
  it('Renders snapshot', () => {
    const { container } = render(<Home />);
    expect(container).toMatchSnapshot();
  });
});
