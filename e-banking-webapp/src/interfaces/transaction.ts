// Interfaces
import { CurrencyUnit, Status, AccountType, GlobalType } from '@/interfaces';

export interface ITransaction {
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
  recipientAccount?: number;
}

export type TransactionCreateData = Omit<
  ITransaction,
  'id' | 'documentId' | 'createdAt' | 'updatedAt' | 'publishedAt'
>;

export type InternalTransferForm = Pick<
  ITransaction,
  'fromAccountType' | 'toAccountType' | 'amount' | 'recipientAccount'
>;
