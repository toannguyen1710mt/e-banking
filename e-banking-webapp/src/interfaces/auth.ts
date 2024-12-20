import { IAccount } from './account';

export interface IUserCredentials {
  id: number;
  email: string;
  password: string;
  confirmPassword: string;
  username: string;
  phone: string;
  country: string;
  avatar?: string;
  postal: string;
}

export type TSignUpPayload = {
  email: string;
  password: string;
  username: string;
};

export interface TSignInFormData {
  username: string;
  password: string;
}

export type AuthResponse = {
  jwt: string;
  user: IUserCredentials;
};

export type TUpdateInfo = Pick<
  IUserCredentials,
  'phone' | 'country' | 'avatar' | 'postal'
>;

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
  accounts?: IAccount[];
}
