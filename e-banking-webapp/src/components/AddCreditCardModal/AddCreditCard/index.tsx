'use client';

// Libs
import { Controller } from 'react-hook-form';

// Context
import { useWizardFormContext } from '@/context';

// Interfaces
import { TEXT_SIZE, TEXT_VARIANT } from '@/interfaces';

// Component
import { Button, Input, Text, CreditCardIcon, DatePicker } from '@/components';

export const AddCreditCard = () => {
  const {
    form: { control },
    onNextStep,
    validateStep,
  } = useWizardFormContext();

  return (
    <>
      <div className='mb-10 flex w-full flex-col gap-4 bg-white'>
        <div className='flex flex-col gap-2'>
          <Text as='span' size={TEXT_SIZE.BASE} variant={TEXT_VARIANT.DEFAULT}>
            Add Credit Card
          </Text>
          <Text
            as='span'
            variant={TEXT_VARIANT.DEFAULT}
            size={TEXT_SIZE['2XS']}
            className='font-normal'
          >
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
              label='Credit Card Number'
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
              <DatePicker
                labelPlacement='outside'
                label='Expire Date'
                aria-label='expireAt'
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
        type='button'
        color='primary'
        isDisabled={!validateStep()}
        onClick={onNextStep}
      >
        Add Card
      </Button>
    </>
  );
};
