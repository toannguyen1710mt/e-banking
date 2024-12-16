// Interfaces
import { CurrencyUnit, Status, AccountType } from '@/interfaces';

export interface Transaction {
  id: string;
  documentId: string;
  currencyUnit?: CurrencyUnit;
  fromAccountId: string;
  toAccountId: string;
  fromAccountType?: AccountType;
  toAccountType?: AccountType;
  amount: number;
  status: Status;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export type InternalTransferForm = Pick<
  Transaction,
  'fromAccountType' | 'toAccountType' | 'amount'
>;
