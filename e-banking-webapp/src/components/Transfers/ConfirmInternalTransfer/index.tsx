'use client';

// Libs
import { useTransition } from 'react';
import { z } from 'zod';

// Components
import { Button, Text } from '@/components';

// Utils
import { formatNumberWithCommas } from '@/utils';

// Contexts
import { useWizardFormContext } from '@/context';

// Schemas
import { InternalTransferFormSchema } from '@/schemas';

interface IConfirmInternalTransferProps<T extends z.ZodType> {
  submitHandler: (data: z.infer<T>) => void;
}

export const ConfirmInternalTransfer = <T extends z.ZodType>({
  submitHandler,
}: IConfirmInternalTransferProps<T>) => {
  const {
    form: { getValues },
    onPrevStep,
    onNextStep,
  } = useWizardFormContext<typeof InternalTransferFormSchema>();

  const [isPending, startTransition] = useTransition();

  const values = getValues();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    startTransition(() => {
      const data = getValues();
      submitHandler(data);
      onNextStep();
    });
  };

  return (
    <div className='flex flex-col items-center justify-center gap-4'>
      <Text as='h4' className='text-sm font-semibold'>
        You are about to transfer
      </Text>
      <Text as='span' className='text-4xl font-bold'>
        ${formatNumberWithCommas(Number(values.internalTransfer.amount))}
      </Text>
      <Text className='max-w-[250px] text-center text-xs font-medium text-primary-200 opacity-50'>
        From your {values.internalTransfer.fromAccountType} wallet to your&nbsp;
        {values.internalTransfer.toAccountType} wallet, this action cannot be
        undone once approved...
      </Text>
      <div className='mt-8 flex gap-8'>
        <Button
          color='tertiary'
          radius='xs'
          size='md'
          isDisabled={isPending}
          onClick={onPrevStep}
        >
          Cancel
        </Button>
        <Button
          aria-label='proceed'
          color='primary'
          radius='xs'
          size='md'
          isDisabled={isPending}
          isLoading={isPending}
          onClick={onSubmit}
        >
          Proceed
        </Button>
      </div>
    </div>
  );
};
