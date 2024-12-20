'use client';

// Libs
import { useTransition } from 'react';
import { z } from 'zod';

// Interfaces
import { AccountType, CurrencyUnit } from '@/interfaces';

// Components
import { Button, Text } from '@/components';

// Utils
import { formatNumberWithCommas } from '@/utils';

// Contexts
import { useWizardFormContext } from '@/context';

// Schemas
import { InternalTransferFormSchema } from '@/schemas';

interface IConfirmInternalTransferProps<T extends z.ZodType> {
  amount: number;
  currencyUnit?: CurrencyUnit;
  fromAccountType: AccountType;
  toAccountType: AccountType;
  submitHandler: (data: z.infer<T>) => void;
}

export const ConfirmInternalTransfer = <T extends z.ZodType>({
  amount,
  currencyUnit = '$',
  fromAccountType,
  toAccountType,
  submitHandler,
}: IConfirmInternalTransferProps<T>) => {
  const {
    form: { getValues },
    prevStep,
    nextStep,
  } = useWizardFormContext<typeof InternalTransferFormSchema>();

  const [isPending, startTransition] = useTransition();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    startTransition(() => {
      const data = getValues();
      submitHandler(data);
      nextStep(e);
    });
  };

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
        <Button color='tertiary' radius='xs' size='md' onClick={prevStep}>
          Cancel
        </Button>
        <Button
          color='primary'
          radius='xs'
          size='md'
          isLoading={isPending}
          onClick={onSubmit}
        >
          Proceed
        </Button>
      </div>
    </div>
  );
};
