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

export type TUpdateInfo = {
  phone: string;
  country: string;
  avatar?: string;
  postal: string;
};
