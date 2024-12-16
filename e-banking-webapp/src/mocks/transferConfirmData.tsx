import { AccountType } from '@/interfaces';

export const TRANSFER_CONFIRM_DATA = {
  amount: 150,
  fromAccountType: AccountType.MAIN,
  userName: 'Yehudi Daud',
  onCancel: () => alert('Cancel clicked!'),
  onProceed: () => alert('Proceed clicked!'),
};
