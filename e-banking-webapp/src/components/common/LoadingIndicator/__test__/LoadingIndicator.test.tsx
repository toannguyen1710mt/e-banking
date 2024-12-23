import { render } from '@testing-library/react';
import { LoadingIndicator } from '..';

describe('LoadingIndicator component', () => {
  it('Should render snapshot correctly', () => {
    expect(render(<LoadingIndicator />)).toMatchSnapshot();
  });
});
