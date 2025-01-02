'use client';

// Interface
import { CurrencyUnit } from '@/interfaces';

// Components
import { Button, CheckIcon, Text } from '@/components';

// Schemas
import { InternalTransferFormSchema } from '@/schemas';

// Context
import { useWizardFormContext } from '@/context';

// Utils
import { formatNumberWithCommas } from '@/utils';

interface IInternalTransferSuccess {
  currencyUnit?: CurrencyUnit;
  onClose: () => void;
}

export const InternalTransferSuccess = ({
  currencyUnit = '$',
  onClose,
}: IInternalTransferSuccess) => {
  const { form } = useWizardFormContext<typeof InternalTransferFormSchema>();
  const values = form.getValues();

  const { amount, fromAccountType, toAccountType } = values.internalTransfer;

  return (
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
};
