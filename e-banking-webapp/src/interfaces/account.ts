// Interfaces
import { CurrencyUnit, ICard, Transaction } from '@/interfaces';

export enum AccountType {
  MAIN = 'Main',
  SAVINGS = 'Savings',
  CHECKINGS = 'Checkings',
}

export interface Account {
  id: string;
  userId: string;
  name: string;
  accountNumber: string;
  balance: number;
  type: AccountType;
  currencyUnit: CurrencyUnit;
}

export interface IAccount {
  id: number;
  accountNumber: string;
  balance: number;
  type: string;
  currency: string;
  transactions?: Transaction[];
  cards?: ICard[];
  name: string;
}

export interface IAccountPayloadData
  extends Omit<IAccount, 'id' | 'transactions' | 'cards'> {}

export interface IAccountPayload {
  user: number;
  data: IAccountPayloadData;
}
