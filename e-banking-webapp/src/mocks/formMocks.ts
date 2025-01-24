import { AccountType, GlobalType } from '@/interfaces';
import { useForm } from 'react-hook-form';

export const useMockFormGlobal = () => {
  return useForm({
    defaultValues: {
      globalTransfer: {
        fromAccountType: '' as AccountType,
        fromCountryType: '' as GlobalType,
        recipientAccount: '',
        amount: '',
      },
      fromAccountId: '',
      fromCardName: '',
      fromAccountNumber: '',
      fromAccountBalance: 0,
      recipientName: '',
    },
  });
};

export const useMockFormInternal = () => {
  return useForm({
    defaultValues: {
      fromAccountId: '',
      fromCardName: '',
      fromAccountNumber: '',
      fromAccountBalance: 0,
      toAccountId: '',
      internalTransfer: {
        amount: '',
        fromAccountType: '' as AccountType,
        toAccountType: '' as AccountType,
      },
      toCardName: '',
      toAccountNumber: '',
      toAccountBalance: 0,
    },
  });
};
