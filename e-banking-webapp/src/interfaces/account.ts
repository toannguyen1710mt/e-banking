// Interfaces
import { CurrencyUnit, ICard, ITransaction } from '@/interfaces';

export enum AccountType {
  MAIN = 'Main',
  SAVINGS = 'Savings',
  CHECKING = 'Checking',
}

export interface IAccount {
  id: number;
  documentId: string;
  accountNumber: string;
  balance: number;
  type: AccountType;
  currency: CurrencyUnit;
  transactions?: ITransaction[];
  cards?: ICard[];
  name: string;
  user?: number;
}

export type GlobalAccount = Omit<IAccount, 'type'>;

export interface IAccountPayloadData
  extends Omit<IAccount, 'id' | 'documentId' | 'transactions' | 'cards'> {}

export interface IAccountPayload {
  data: IAccountPayloadData;
}

export interface Preferences {
  announcements: boolean;
  updates: boolean;
  feedbacksAndSurvey: boolean;
  events: boolean;
  generalNotification: boolean;
  promotions: boolean;
  eventsNearMe: boolean;
}
