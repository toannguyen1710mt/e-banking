// Interfaces
import { Column, ITransaction } from '@/interfaces';

export const TRANSACTION_HOME_TABLE_COLUMNS: Column<ITransaction>[] = [
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

export const TRANSFER_RECEIVED_TABLE_COLUMNS: Column<ITransaction>[] = [
  { key: 'id', title: 'Transaction ID' },
  {
    key: 'createdAt',
    title: 'Transaction Date',
  },
  {
    key: 'fromAccountType',
    title: 'From',
  },
  {
    key: 'amount',
    title: 'Amount',
  },
];

export const TRANSFER_SENT_TABLE_COLUMNS: Column<ITransaction>[] = [
  { key: 'id', title: 'Transaction ID' },
  {
    key: 'createdAt',
    title: 'Transaction Date',
  },
  {
    key: 'amount',
    title: 'Amount',
  },
  {
    key: 'status',
    title: 'Status',
  },
];

export const TRANSACTION_TABLE_COLUMNS: Column<ITransaction>[] = [
  { key: 'id', title: 'Transaction ID' },
  {
    key: 'createdAt',
    title: 'Transaction Date',
  },
  {
    key: 'fromAccountType',
    title: 'From',
  },
  {
    key: 'toAccountType',
    title: 'To',
  },
  {
    key: 'amount',
    title: 'Amount',
  },
  {
    key: 'status',
    title: 'Status',
  },
];
