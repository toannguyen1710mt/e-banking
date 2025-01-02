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
  userName: string;
}

export const ConfirmGlobalTransfer = <T extends z.ZodType>({
  submitHandler,
  amountInUSD,
  userName,
}: ConfirmGlobalTransferProps<T>) => {
  const {
    form: { getValues },
    onPrevStep,
    onNextStep,
  } = useWizardFormContext<typeof GlobalTransferFormSchema>();

  const [isPending, startTransition] = useTransition();

  const values = getValues();

  const { fromAccountType } = values || {};

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
        {userName} is about to receive
      </Text>
      <Text className='mt-3 text-4xl font-bold text-navyBlue'>
        ${amountInUSD}
      </Text>
      <Text className='mt-3 text-xs font-medium text-transparentBlack'>
        From your {fromAccountType} wallet to your {userName} wallet, this
        action cannot be undone once approved...
      </Text>
      <div className='mt-10 flex gap-6'>
        <Button radius='xs' color='tertiary' size='2xl' onClick={onPrevStep}>
          Cancel
        </Button>
        <Button
          radius='xs'
          color='navyBlue'
          size='2xl'
          onClick={onSubmit}
          isLoading={isPending}
        >
          Proceed
        </Button>
      </div>
    </div>
  );
};
