// Interfaces
import { CurrencyUnit, AccountType } from '@/interfaces';

export interface ITransaction {
  id: string;
  documentId: string;
  currencyUnit?: CurrencyUnit;
  fromAccountId: string;
  toAccountId: string;
  fromAccountType?: AccountType;
  toAccountType?: AccountType;
  amount: number;
  statusTransaction: boolean;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  recipientName?: string;
}

export type TransactionCreateData = Omit<
  ITransaction,
  'id' | 'documentId' | 'createdAt' | 'updatedAt' | 'publishedAt'
>;

export type InternalTransferForm = Pick<
  ITransaction,
  'fromAccountType' | 'toAccountType' | 'amount' | 'recipientName'
>;

export enum TransferType {
  RECEIVED = 'received',
  SENT = 'sent',
}
