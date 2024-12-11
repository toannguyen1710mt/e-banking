'use client';

import { Controller } from 'react-hook-form';

// Interfaces
import { TEXT_SIZE, TEXT_VARIANT } from '@/interfaces';

// Styles
import '@/styles/input.css';

// Context
import { useWizardFormContext } from '@/context';

// Components
import { Button, Input, Text } from '@/components';
import { CreditCardIcon, UserIcon, WalletIcon } from '@/components/icons';

export const CreditCardForm = () => {
  const {
    form: { control },
    isStepValid,
  } = useWizardFormContext();

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
          name='card.holdersName'
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

      <Button isDisabled={!isStepValid} type='submit' color='primary'>
        Continue
      </Button>
    </>
  );
};
