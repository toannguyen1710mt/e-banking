// Interfaces
import { Column, ITransaction } from '@/interfaces';

export const TRANSACTION_TABLE_COLUMNS: Column<ITransaction>[] = [
  { key: 'id', title: 'Transaction ID' },
  {
    key: 'createdAt',
    title: 'Transaction Date',
  },
  {
    key: 'status',
    title: 'Status',
  },
  {
    key: 'amount',
    title: 'Amount',
  },
  {
    key: 'action',
    title: '',
  },
];
