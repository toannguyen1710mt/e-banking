// Interfaces
import { CurrencyUnit, Status, AccountType } from '@/interfaces';

export interface ITransaction {
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

export type TransactionCreateData = Omit<
  Transaction,
  'id' | 'documentId' | 'createdAt' | 'updatedAt' | 'publishedAt'
>;

export type InternalTransferForm = Pick<
  ITransaction,
  'fromAccountType' | 'toAccountType' | 'amount'
>;
