'use client';

import { Controller } from 'react-hook-form';
import { z } from 'zod';
import { useTransition } from 'react';

// Interfaces
import { TEXT_SIZE, TEXT_VARIANT } from '@/interfaces';

// Constants
import { ERROR_MESSAGES } from '@/constants';
import { SignUpSchema } from '@/constants/rules';

// Styles
import '@/styles/input.css';

// Context
import { useToastContext, useWizardFormContext } from '@/context';

// Components
import { Button, Input, Text } from '@/components';
import { CreditCardIcon, UserIcon, WalletIcon } from '@/components/icons';

interface ICreditCard<T extends z.ZodType> {
  schema: T;
  submitHandler: (data: z.infer<T>) => void;
}

export const CreditCardForm = <T extends z.ZodType>({
  submitHandler,
}: ICreditCard<T>) => {
  const {
    form: { control, handleSubmit, setError },
    isStepValid,
    nextStep,
    goToStep,
  } = useWizardFormContext<typeof SignUpSchema>();

  const { showToast } = useToastContext();

  const [isPending, startTransition] = useTransition();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    startTransition(async () => {
      const handler = handleSubmit(submitHandler);
      try {
        await handler(e);
        nextStep(e);
      } catch (error) {
        setError('user.email', {
          type: 'validate',
          message: String(error),
        });

        showToast(ERROR_MESSAGES.SIGN_UP_FAILED, 'error', 'top-center');

        goToStep(0);
      }
    });
  };

  return (
    <>
      <div className='mb-10 flex w-full flex-col gap-4 bg-white'>
        <Text
          size={TEXT_SIZE.SM}
          variant={TEXT_VARIANT.INFO}
          className='font-normal'
        >
          Please provide your phone and contact info
        </Text>

        <Controller
          control={control}
          name='card.holderName'
          render={({ field, fieldState: { error } }) => (
            <Input
              labelPlacement='outside'
              label='Holders Name'
              aria-label='holdersName'
              placeholder='Holders Name'
              isInvalid={!!error?.message}
              errorMessage={error?.message}
              startContent={<UserIcon />}
              {...field}
            />
          )}
        />

        <Controller
          control={control}
          name='card.cardNumber'
          render={({ field, fieldState: { error } }) => (
            <Input
              labelPlacement='outside'
              label='Card Number'
              aria-label='cardNumber'
              placeholder='Card Number'
              type='text'
              maxLength={12}
              isInvalid={!!error?.message}
              errorMessage={error?.message}
              startContent={<CreditCardIcon />}
              {...field}
            />
          )}
        />

        <div className='flex gap-5'>
          <Controller
            control={control}
            name='card.expireAt'
            render={({ field, fieldState: { error } }) => (
              <Input
                labelPlacement='outside'
                label='Expire Date'
                aria-label='expireAt'
                type='month'
                placeholder='DD/MM'
                isInvalid={!!error?.message}
                errorMessage={error?.message}
                {...field}
              />
            )}
          />

          <Controller
            control={control}
            name='card.ccv'
            render={({ field, fieldState: { error } }) => (
              <Input
                labelPlacement='outside'
                label='CCV'
                aria-label='ccv'
                placeholder='000'
                maxLength={3}
                startContent={<WalletIcon />}
                type='string'
                isInvalid={!!error?.message}
                errorMessage={error?.message}
                {...field}
              />
            )}
          />
        </div>
      </div>

      <Button
        isDisabled={!isStepValid}
        type='button'
        color='primary'
        isLoading={isPending}
        onClick={onSubmit}
      >
        Continue
      </Button>
    </>
  );
};
