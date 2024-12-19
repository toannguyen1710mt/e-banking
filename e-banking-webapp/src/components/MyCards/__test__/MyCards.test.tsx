import { render } from '@testing-library/react';

// Mock data
import { MOCK_DATA_USER } from '@/mocks';

// Components
import { MyCards } from '..';

jest.mock('@/constants/rules', () => ({
  createStepSchema: jest.fn(),
}));

describe('MyCards component', () => {
  it('Should render snapshot correctly', () => {
    expect(
      render(
        <MyCards accounts={MOCK_DATA_USER.accounts} onCardSelect={jest.fn()} />,
      ),
    ).toMatchSnapshot();
  });
});
