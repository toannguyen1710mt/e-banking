import { render, screen } from '@testing-library/react';

// Mocks
import { MOCK_DATA_USER } from '@/mocks';

// Component
import { BalanceCardList } from '..';

describe('BalanceCardList component', () => {
  it('Should render snapshot correctly.', () => {
    expect(
      render(<BalanceCardList accounts={MOCK_DATA_USER.accounts} />),
    ).toMatchSnapshot();
  });

  it('Should render snapshot when is empty data.', () => {
    const { getAllByText } = render(<BalanceCardList />);

    expect(getAllByText('$0')[0]).toBeInTheDocument();
  });

  it('Should render BalanceCardList when is empty data.', () => {
    render(<BalanceCardList />);

    expect(screen.getByText('Your total balance')).toBeInTheDocument();
    expect(screen.getByText('Your Savings balance')).toBeInTheDocument();
    expect(screen.getByText('Your Checkings balance')).toBeInTheDocument();
    expect(screen.getByText('Total Spend')).toBeInTheDocument();
  });
});
