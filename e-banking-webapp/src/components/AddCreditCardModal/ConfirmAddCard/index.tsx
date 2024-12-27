'use client';

import { useTransition } from 'react';
import { Controller } from 'react-hook-form';
import { RadioGroup } from '@nextui-org/react';
import { z } from 'zod';

// Constants
import { ACCOUNT_TYPES } from '@/constants';

// Interfaces
import { TEXT_SIZE, TEXT_VARIANT } from '@/interfaces';

// Context
import { useWizardFormContext } from '@/context';

// Mocks data
import { CARD_CREDIT_DATA } from '@/mocks';

// Components
import { Button, Input, RadioButton, Text } from '@/components/common';
import { CreditCard } from '@/components/CreditCard';
import { CreditCardIcon } from '@/components/icons';

interface IConfirmAddCard<T extends z.ZodType> {
  schema: T;
  submitHandler: (data: z.infer<T>) => void;
}

export const ConfirmAddCard = <T extends z.ZodType>({
  submitHandler,
}: IConfirmAddCard<T>) => {
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
      <Text as='h2' variant={TEXT_VARIANT.DEFAULT}>
        Credit Card
      </Text>
      <div className='mt-[10px] flex flex-col justify-between'>
        <div className='flex w-full items-center justify-between gap-[19px]'>
          {/* TODO: Will integrating api later */}
          <CreditCard {...CARD_CREDIT_DATA[0]} isModal={true} />

          <div className='flex flex-1 flex-col gap-[15px]'>
            <Controller
              control={control}
              name='fullName'
              render={({ field, fieldState: { error } }) => (
                <Input
                  labelPlacement='outside'
                  label='Holder’s Name'
                  aria-label='name-of-the-holder'
                  placeholder='Holder’s Name'
                  size='sm'
                  classNames={{
                    input: 'm-0 text-2xs p-0 font-bold',
                    label: 'text-xs !text-black',
                  }}
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
                  label='Credit Card Number'
                  aria-label='credit-card-number'
                  placeholder='Card Number'
                  classNames={{
                    input: 'm-0 text-2xs p-0 font-bold',
                    label: 'text-xs !text-black',
                  }}
                  size='sm'
                  type='text'
                  maxLength={12}
                  isInvalid={!!error?.message}
                  errorMessage={error?.message}
                  endContent={<CreditCardIcon />}
                  {...field}
                />
              )}
            />
          </div>
        </div>
        <div className='mt-[19px]'>
          <Text variant={TEXT_VARIANT.DEFAULT} size={TEXT_SIZE.XS}>
            How may wallets will your Card have
          </Text>
          <Text as='span' size={TEXT_SIZE['2XS']} className='!text-neutralGray'>
            Please note that all cards must have a main wallet
          </Text>

          <RadioGroup className='mt-[20px]'>
            {Object.entries(ACCOUNT_TYPES).map(([key, label]) => (
              <RadioButton key={key} value={label}>
                {label}
              </RadioButton>
            ))}
          </RadioGroup>
        </div>

        <Button
          type='button'
          color='primary'
          className='mx-auto mt-[30px] max-w-[320px]'
          isDisabled={!isStepValid}
          isLoading={isPending}
          onClick={onSubmit}
        >
          Confirm
        </Button>
      </div>
    </>
  );
};
