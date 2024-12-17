import { render } from '@testing-library/react';

// Components
import { MyCards } from '..';

jest.mock('@/constants/rules', () => ({
  createStepSchema: jest.fn(),
}));

describe('MyCards component', () => {
  it('Should render snapshot correctly', () => {
    expect(render(<MyCards />)).toMatchSnapshot();
  });
});
