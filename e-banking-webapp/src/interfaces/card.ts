export interface ICard {
  id: number;
  cardNumber: string;
  holderName: string;
  ccv: string;
  expireAt: string;
  account?: number;
  createdAt?: string;
}

export interface ICardsPayloadByAccount extends Omit<ICard, 'account'> {
  accountType?: string;
}

export interface ICardPayloadData extends Omit<ICard, 'id'> {}

export interface ICardPayload {
  data: ICardPayloadData;
}
