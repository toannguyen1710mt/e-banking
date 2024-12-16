// Interface
import { AccountType, CurrencyUnit } from '@/interfaces';

// Components
import { Button, CheckIcon, Text } from '@/components';

// Utils
import { formatNumberWithCommas } from '@/utils';

interface IInternalTransferSuccess {
  amount: number;
  currencyUnit?: CurrencyUnit;
  fromAccountType: AccountType;
  toAccountType: AccountType;
  onClose: () => void;
}

export const InternalTransferSuccess = ({
  amount,
  currencyUnit = '$',
  fromAccountType,
  toAccountType,
  onClose,
}: IInternalTransferSuccess) => (
  <div className='flex flex-col items-center gap-4'>
    <div className='flex h-14 w-14 items-center justify-center rounded-full bg-background-300'>
      <CheckIcon />
    </div>
    <Text as='h4' className='text-sm font-semibold'>
      Transaction was Successful
    </Text>
    <Text className='max-w-[220px] text-center text-xs font-medium text-primary-200 opacity-50'>
      A sum of {currencyUnit} {formatNumberWithCommas(amount)} was transferred
      from your {fromAccountType} wallet to your {toAccountType} wallet
    </Text>

    <Button
      color='tertiary'
      radius='xs'
      size='md'
      className='mt-8'
      onClick={onClose}
    >
      Close
    </Button>
  </div>
);
