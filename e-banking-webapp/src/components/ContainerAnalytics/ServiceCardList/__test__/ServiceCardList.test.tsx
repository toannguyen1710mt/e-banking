import { render } from '@testing-library/react';

// Component
import { ServiceCardList } from '..';

describe('ServiceCardList component', () => {
  it('Should render snapshot correctly.', () => {
    expect(render(<ServiceCardList />)).toMatchSnapshot();
  });
});
