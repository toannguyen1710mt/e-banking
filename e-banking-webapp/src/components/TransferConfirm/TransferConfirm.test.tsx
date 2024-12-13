// Libs
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

// Constants
import { TRANSFER_CONFIRM_DATA } from '@/constants';

// Components
import { TransferConfirm } from '@/components';

describe('TransferConfirm component', () => {
  test('renders correctly and matches snapshot', () => {
    const { container } = render(
      <TransferConfirm {...TRANSFER_CONFIRM_DATA} />,
    );
    expect(container).toMatchSnapshot();
  });

  test('displays the correct title', () => {
    render(<TransferConfirm {...TRANSFER_CONFIRM_DATA} />);
    expect(screen.getByText(TRANSFER_CONFIRM_DATA.title)).toBeInTheDocument();
  });

  test('displays the correct amount', () => {
    render(<TransferConfirm {...TRANSFER_CONFIRM_DATA} />);
    expect(
      screen.getByText(`$${TRANSFER_CONFIRM_DATA.amount}`),
    ).toBeInTheDocument();
  });

  test('displays the correct description', () => {
    render(<TransferConfirm {...TRANSFER_CONFIRM_DATA} />);
    expect(
      screen.getByText(TRANSFER_CONFIRM_DATA.description),
    ).toBeInTheDocument();
  });

  test('renders the Cancel and Proceed buttons', () => {
    render(<TransferConfirm {...TRANSFER_CONFIRM_DATA} />);
    expect(screen.getByRole('button', { name: /Cancel/i })).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /Procced/i }),
    ).toBeInTheDocument();
  });
});
