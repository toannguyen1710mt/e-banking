import { render } from '@testing-library/react';

// Component
import { MetricsCardList } from '..';

describe('MetricsCardList component', () => {
  it('Should render snapshot correctly.', () => {
    expect(render(<MetricsCardList />)).toMatchSnapshot();
  });
});
