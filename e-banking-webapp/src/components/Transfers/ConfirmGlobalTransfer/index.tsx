'use client';

// Interfaces
import { IAccount, AccountType, CurrencyUnit } from '@/interfaces';

// Components
import { Button, Text } from '@/components';

// Utils
import { formatNumberWithCommas } from '@/utils';

interface IConfirmGlobalTransfer {
  amount: number;
  currencyUnit?: CurrencyUnit;
  fromAccountType: AccountType;
  userName: IAccount['name'];
  onCancel: () => void;
  onProceed: () => void;
}

export const ConfirmGlobalTransfer = ({
  amount,
  currencyUnit = '$',
  userName,
  fromAccountType,
  onCancel,
  onProceed,
}: IConfirmGlobalTransfer) => (
  <div className='flex w-[252px] flex-col items-center text-center'>
    <Text className='text-sm font-semibold text-navyBlue'>
      {userName} is about to receive
    </Text>
    <Text className='mt-3 text-4xl font-bold text-navyBlue'>
      {currencyUnit} {formatNumberWithCommas(amount)}
    </Text>
    <Text className='mt-3 text-xs font-medium text-transparentBlack'>
      From your {fromAccountType} wallet to your {userName} wallet, this action
      cannot be undone once approved...
    </Text>
    <div className='mt-10 flex gap-6'>
      <Button radius='xs' color='danger' size='xxl' onClick={onCancel}>
        Cancel
      </Button>
      <Button radius='xs' color='navyBlue' size='xxl' onClick={onProceed}>
        Procced
      </Button>
    </div>
  </div>
);
