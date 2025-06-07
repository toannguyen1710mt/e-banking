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
  fullName?: string;
}

export type TSignUpPayload = {
  email: string;
  password: string;
  username: string;
};

export interface TSignInFormData {
  identifier: string;
  password: string;
}

export type AuthResponse = {
  jwt: string;
  user: IUserCredentials;
};

export type TUpdateInfo = Partial<
  Pick<IUserCredentials, 'phone' | 'country' | 'avatar' | 'postal'>
>;

export type TChangePasswordFormData = {
  currentPassword: string;
  password: string;
  passwordConfirmation: string;
};

export type TChangePasswordSuccessResponse = IUser & {
  jwt: string;
};

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
  token: string;
  accounts?: IAccount[];
  announcements?: boolean;
  updates?: boolean;
  feedbacksAndSurvey?: boolean;
  events?: boolean;
  generalNotification?: boolean;
  promotions?: boolean;
  eventsNearMe?: boolean;
}
