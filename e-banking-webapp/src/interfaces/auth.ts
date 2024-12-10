export interface IUserCredentials {
  id: number;
  email: string;
  password: string;
  confirmPassword: string;
  username: string;
}

export type TSignUpFormData = Omit<IUserCredentials, 'id'>;

export interface TSignInFormData {
  username: string;
  password: string;
}
