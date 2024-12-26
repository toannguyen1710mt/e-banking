'use client';

// Libs
import { useTransition } from 'react';
import { Controller } from 'react-hook-form';
import { z } from 'zod';

// Context
import { useWizardFormContext } from '@/context';

// Component
import { Button, Input, Text, CreditCardIcon } from '@/components';

interface IAddCreditCard<T extends z.ZodType> {
  schema: T;
  submitHandler: (data: z.infer<T>) => void;
}

export const AddCreditCard = <T extends z.ZodType>({
  submitHandler,
}: IAddCreditCard<T>) => {
  const {
    form: { control, handleSubmit },
    isStepValid,
    nextStep,
  } = useWizardFormContext();

  const [isPending, startTransition] = useTransition();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    startTransition(async () => {
      const handler = handleSubmit(submitHandler);
      await handler(e);
      nextStep(e);
    });
  };

  return (
    <>
      <div className='mb-10 flex w-full flex-col gap-4 bg-white'>
        <div className='flex flex-col gap-2'>
          <Text as='span' className='text-base font-medium text-black'>
            Add Credit Card
          </Text>
          <Text as='span' className='text-[10px] font-normal text-black'>
            Please fill the details below
          </Text>
        </div>

        <Controller
          control={control}
          name='fullName'
          render={({ field, fieldState: { error } }) => (
            <Input
              labelPlacement='outside'
              label='Full Name'
              aria-label='Full Name'
              placeholder='Full Name'
              isInvalid={!!error?.message}
              errorMessage={error?.message}
              {...field}
            />
          )}
        />

        <Controller
          control={control}
          name='cardNumber'
          render={({ field, fieldState: { error } }) => (
            <Input
              labelPlacement='outside'
              label='Credict Card Number'
              aria-label='cardNumber'
              placeholder='Card Number'
              type='text'
              maxLength={12}
              isInvalid={!!error?.message}
              errorMessage={error?.message}
              endContent={<CreditCardIcon />}
              {...field}
            />
          )}
        />

        <div className='flex gap-5'>
          <Controller
            control={control}
            name='expireAt'
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
            name='ccv'
            render={({ field, fieldState: { error } }) => (
              <Input
                labelPlacement='outside'
                label='CCV'
                aria-label='ccv'
                placeholder='000'
                type='string'
                isInvalid={!!error?.message}
                errorMessage={error?.message}
                maxLength={3}
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
        Add Card
      </Button>
    </>
  );
};
