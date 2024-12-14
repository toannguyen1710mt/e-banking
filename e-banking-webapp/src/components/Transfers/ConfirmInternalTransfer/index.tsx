'use client';

// Interfaces
import { AccountType, CurrencyUnit } from '@/interfaces';

// Components
import { Button, Text } from '@/components';

// Utils
import { formatNumberWithCommas } from '@/utils';

interface ConfirmInternalTransferProps {
  amount: number;
  currencyUnit?: CurrencyUnit;
  fromAccountType: AccountType;
  toAccountType: AccountType;
  onCancel: () => void;
  onConfirm: () => void;
}

export const ConfirmInternalTransfer = ({
  amount,
  currencyUnit = '$',
  fromAccountType,
  toAccountType,
  onCancel,
  onConfirm,
}: ConfirmInternalTransferProps) => {
  return (
    <div className='flex flex-col items-center justify-center gap-4'>
      <Text as='h4' className='text-sm font-semibold'>
        You are about to transfer
      </Text>
      <Text as='span' className='text-4xl font-bold'>
        {currencyUnit} {formatNumberWithCommas(amount)}
      </Text>
      <Text className='max-w-[250px] text-center text-xs font-medium text-primary-200 opacity-50'>
        From your {fromAccountType} wallet to your {toAccountType} wallet, this
        action cannot be undone once approved...
      </Text>
      <div className='mt-8 flex gap-8'>
        <Button color='tertiary' radius='xs' size='md' onClick={onCancel}>
          Cancel
        </Button>
        <Button color='primary' radius='xs' size='md' onClick={onConfirm}>
          Proceed
        </Button>
      </div>
    </div>
  );
};
