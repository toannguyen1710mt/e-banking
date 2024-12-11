'use client';

import { Controller } from 'react-hook-form';

// Interfaces
import { TEXT_SIZE, TEXT_VARIANT } from '@/interfaces';

// Context
import { useWizardFormContext } from '@/context';

// Components
import { Button, Input, Text } from '@/components';
import { GlobalIcon, MailBoxIcon, PhoneIcon } from '@/components/icons';

export const ContactForm = () => {
  const {
    form: { control },
    nextStep,
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
          name='contact.phone'
          render={({ field, fieldState: { error } }) => (
            <Input
              aria-label='phone'
              placeholder='+2547xxxxx503'
              isInvalid={!!error?.message}
              errorMessage={error?.message}
              startContent={<PhoneIcon />}
              {...field}
            />
          )}
        />

        <Controller
          control={control}
          name='contact.country'
          render={({ field }) => (
            <Input
              aria-label='country'
              startContent={<GlobalIcon />}
              disabled
              {...field}
            />
          )}
        />

        <Controller
          control={control}
          name='contact.postalAddress'
          render={({ field, fieldState: { error } }) => (
            <Input
              aria-label='postalAddress'
              placeholder='Postal Address'
              startContent={<MailBoxIcon />}
              type='text'
              isInvalid={!!error?.message}
              errorMessage={error?.message}
              disabled
              {...field}
            />
          )}
        />
      </div>

      <Button
        isDisabled={!isStepValid}
        onClick={nextStep}
        type='button'
        color='primary'
      >
        Continue
      </Button>
    </>
  );
};
