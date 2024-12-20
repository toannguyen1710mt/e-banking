import { IAccount } from '@/interfaces';

export interface IUser {
  id: number;
  documentId: string;
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  postal: string;
  phone: string;
  country: string;
  avatar: string;
}

export type UserAccounts = IUser & {
  accounts: IAccount[];
};
