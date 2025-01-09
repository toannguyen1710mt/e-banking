'use client';

// Third Party
import { z } from 'zod';
import { useTransition } from 'react';

// Utils
import { GlobalTransferFormSchema } from '@/schemas';

// Hooks
import { useWizardFormContext } from '@/context';

// Components
import { Button, Text } from '@/components';

interface ConfirmGlobalTransferProps<T extends z.ZodType> {
  submitHandler: (data: z.infer<T>) => void;
  amountInUSD: string;
}

export const ConfirmGlobalTransfer = <T extends z.ZodType>({
  submitHandler,
  amountInUSD,
}: ConfirmGlobalTransferProps<T>) => {
  const {
    form: { getValues },
    onPrevStep,
    onNextStep,
  } = useWizardFormContext<typeof GlobalTransferFormSchema>();

  const [isPending, startTransition] = useTransition();

  const values = getValues();

  const { fromAccountType, recipientName } = values || {};

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    startTransition(() => {
      const data = getValues();
      submitHandler(data);
      onNextStep(e);
    });
  };

  return (
    <div className='flex w-[252px] flex-col items-center text-center'>
      <Text className='text-sm font-semibold text-navyBlue'>
        {recipientName} is about to receive
      </Text>
      <Text className='mt-3 text-4xl font-bold text-navyBlue'>
        ${amountInUSD}
      </Text>
      <Text className='mt-3 text-xs font-medium text-transparentBlack'>
        From your {fromAccountType} wallet to {recipientName}&apos;s wallet,
        this action cannot be undone once approved...
      </Text>
      <div className='mt-10 flex gap-6'>
        <Button
          radius='xs'
          color='tertiary'
          size='md'
          isDisabled={isPending}
          onClick={onPrevStep}
        >
          Cancel
        </Button>
        <Button
          radius='xs'
          color='navyBlue'
          size='md'
          onClick={onSubmit}
          isLoading={isPending}
        >
          Proceed
        </Button>
      </div>
    </div>
  );
};
