import { render } from '@testing-library/react';

// Components
import { CreditCard } from '..';

jest.mock('@/constants/rules', () => ({
  createStepSchema: jest.fn(),
}));

describe('CreditCard component', () => {
  it('Should render snapshot correctly', () => {
    expect(
      render(
        <CreditCard
          cardNumber='537544114540'
          expireDate='06/28'
          holderName='DONALD FLINCH CORTEZ'
          bankName='Universal Bank'
        />,
      ),
    ).toMatchSnapshot();
  });
});
