// Interfaces
import { CurrencyUnit, Status, AccountType, GlobalType } from '@/interfaces';

export interface Transaction {
  id: string;
  documentId: string;
  currencyUnit?: CurrencyUnit;
  fromAccountId: string;
  toAccountId: string;
  fromAccountType?: AccountType | GlobalType;
  toAccountType?: AccountType | GlobalType;
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
