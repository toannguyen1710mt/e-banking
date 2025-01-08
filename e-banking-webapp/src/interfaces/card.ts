import { IAccount } from './account';

export interface ICard {
  id: number;
  cardNumber: string;
  holderName: string;
  ccv: string;
  expireAt: string;
  account?: number;
}

export interface ICardsPayloadByAccount extends Omit<ICard, 'account'> {
  account?: IAccount;
}

export interface ICardPayloadData extends Omit<ICard, 'id'> {}

export interface ICardPayload {
  data: ICardPayloadData;
}
