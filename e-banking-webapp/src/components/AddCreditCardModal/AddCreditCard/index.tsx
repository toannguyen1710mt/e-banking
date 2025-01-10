'use client';

// Libs
import { Controller } from 'react-hook-form';

// Context
import { useWizardFormContext } from '@/context';

// Interfaces
import { TEXT_SIZE, TEXT_VARIANT } from '@/interfaces';

// Schemas
import { CreditCardSchema } from '@/schemas';
// Helpers
import { formatCardNumber } from '@/utils';

// Component
import {
  Button,
  Input,
  Text,
  CreditCardIcon,
  MonthYearPicker,
} from '@/components';

export const AddCreditCard = () => {
  const {
    form: { control },
    onNextStep,
    validateStep,
  } = useWizardFormContext<typeof CreditCardSchema>();

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
          name='cardInfo.holderName'
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
          name='cardInfo.cardNumber'
          render={({ field, fieldState: { error } }) => (
            <Input
              labelPlacement='outside'
              label='Credit Card Number'
              aria-label='cardNumber'
              placeholder='Card Number'
              type='text'
              maxLength={14}
              isInvalid={!!error?.message}
              errorMessage={error?.message}
              endContent={<CreditCardIcon />}
              {...field}
              onChange={(e) => {
                const formattedValue = formatCardNumber(e.target.value);
                field.onChange(formattedValue);
              }}
              value={formatCardNumber(field.value || '')}
            />
          )}
        />

        <div className='flex gap-5'>
          <Controller
            control={control}
            name='cardInfo.expireAt'
            render={({ field }) => (
              <MonthYearPicker
                customClass='w-[50%]'
                label='Expire Date'
                // TODO: Will update later
                // isInvalid={!!error?.message}
                // errorMessage={error?.message}
                {...field}
              />
            )}
          />

          <Controller
            control={control}
            name='cardInfo.ccv'
            render={({ field, fieldState: { error } }) => (
              <Input
                labelPlacement='outside'
                label='CCV'
                aria-label='ccv'
                placeholder='000'
                type='string'
                className='w-[50%]'
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
