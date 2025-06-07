import { render } from '@testing-library/react';
import { MainContent } from '..';

describe('MainContent component', () => {
  it('Should render snapshot correctly.', () => {
    expect(render(<MainContent />)).toMatchSnapshot();
  });
});
