// Libs
import { render, screen } from '@testing-library/react';

// Components
import {
  FocusIcon,
  QuickAction,
  RefreshIcon,
  SendIcon,
  TransactionIcon,
} from '@/components';

const mockQuickActions = [
  {
    icon: FocusIcon,
    label: 'Top Up',
    isDisabled: true,
    onClick: jest.fn(),
  },
  {
    icon: SendIcon,
    label: 'Transfer',
    onClick: jest.fn(),
  },
  {
    icon: RefreshIcon,
    label: 'Request',
    isDisabled: true,
    onClick: jest.fn(),
  },
  {
    icon: TransactionIcon,
    label: 'Balance',
    onClick: jest.fn(),
  },
];

describe('QuickAction component', () => {
  test('should match snapshot for QuickAction', () => {
    const { container } = render(<QuickAction />);

    expect(container).toMatchSnapshot();
  });

  test('should disable buttons when `isDisabled` is true', () => {
    render(<QuickAction />);

    mockQuickActions.forEach((action) => {
      const button = screen.getByText(action.label).closest('button');

      if (action.isDisabled) {
        expect(button).toBeDisabled();
      } else {
        expect(button).not.toBeDisabled();
      }
    });
  });
});
