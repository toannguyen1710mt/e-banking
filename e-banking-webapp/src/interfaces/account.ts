// Interfaces
import { CurrencyUnit } from '@/interfaces';

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
