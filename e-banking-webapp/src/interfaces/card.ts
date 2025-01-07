import { IAccount } from './account';

export interface ICard {
  id: number;
  fullName?: string;
  cardNumber: string;
  holderName: string;
  ccv: string;
  expireAt: string;
  account?: IAccount;
}

export interface ICardPayloadData extends Omit<ICard, 'id' | 'fullName'> {}

export interface ICardPayload {
  account: number;
  data: ICardPayloadData;
}
