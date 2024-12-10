// Components
import {
  FocusIcon,
  RefreshIcon,
  SendIcon,
  TransactionIcon,
} from '@/components';

export const MOCK_ACTIONS = [
  {
    icon: FocusIcon,
    label: 'Top Up',
    isDisabled: true,
    onClick: () => {},
  },
  {
    icon: SendIcon,
    label: 'Transfer',
    onClick: () => {},
  },
  {
    icon: RefreshIcon,
    label: 'Request',
    onClick: () => {},
  },
  {
    icon: TransactionIcon,
    label: 'Balance',
    isDisabled: true,
    onClick: () => {},
  },
];
