// Interfaces
import { AccountType } from '@/interfaces';

export const ACCOUNT_TYPES = {
  MAIN_WALLET: 'Main Wallet',
  SAVINGS: 'Savings',
  CHECKING: 'Checking',
};

export const TRANSFER_FORM_ACCOUNT_OPTIONS = [
  {
    key: AccountType.MAIN,
    label: 'Main Account',
  },
  {
    key: AccountType.SAVINGS,
    label: 'Savings',
  },
  {
    key: AccountType.CHECKINGS,
    label: 'Checkings',
  },
];

export const MY_CARDS_ACCOUNTS = [
  {
    title: AccountType.MAIN,
    expireDate: '06/24',
    numberAccount: '0123456789',
  },
  {
    title: AccountType.SAVINGS,
    expireDate: '06/24',
    numberAccount: '0123456789',
  },
  {
    title: AccountType.CHECKINGS,
    expireDate: '06/24',
    numberAccount: '0123456789',
  },
];
