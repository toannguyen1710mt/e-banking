'use client';

import { Controller } from 'react-hook-form';

// Context
import { useWizardFormContext } from '@/context';

// Components
import { Button, Input } from '@/components';
import { GlobalIcon, MailBoxIcon, PhoneIcon } from '@/components/icons';

export const ContactForm = () => {
  const {
    form: { control },
    onNextStep,
    validateStep,
  } = useWizardFormContext();

  return (
    <>
      <div className='mb-10 flex w-full flex-col gap-4 bg-white'>
        <Controller
          control={control}
          name='contact.phone'
          render={({ field, fieldState: { error } }) => (
            <Input
              aria-label='phone'
              placeholder='+2547xxxxx503'
              maxLength={12}
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
          name='contact.postal'
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
        isDisabled={!validateStep()}
        onClick={onNextStep}
        type='button'
        color='primary'
      >
        Continue
      </Button>
    </>
  );
};
