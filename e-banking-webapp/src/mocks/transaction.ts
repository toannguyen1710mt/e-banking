// Interfaces
import { Status, Transaction } from '@/interfaces';

// Utils
import { formatDate } from '@/utils';

export const MOCK_TRANSACTIONS: Transaction[] = [
  {
    transactionId: 'TX12345',
    transactionDate: formatDate('2024-12-01'),
    status: Status.SUCCESS,
    amount: 120,
    currencyUnit: '$',
  },
  {
    transactionId: 'TX12346',
    transactionDate: formatDate('2024-12-02'),
    status: Status.FAILED,
    amount: 75,
    currencyUnit: '$',
  },
  {
    transactionId: 'TX12347',
    transactionDate: formatDate('2024-12-03'),
    status: Status.FAILED,
    amount: 50,
    currencyUnit: '$',
  },
  {
    transactionId: 'TX12348',
    transactionDate: formatDate('2024-12-04'),
    status: Status.SUCCESS,
    amount: 200,
    currencyUnit: '$',
  },
];
