import { AccountType } from '@/interfaces';

export const TRANSFER_CONFIRM_DATA = {
  amount: 150,
  toAccountType: AccountType.SAVINGS,
  fromAccountType: AccountType.MAIN,
  onCancel: () => alert('Cancel clicked!'),
  onProceed: () => alert('Proceed clicked!'),
};
