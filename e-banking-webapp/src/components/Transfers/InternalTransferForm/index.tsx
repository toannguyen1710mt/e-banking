'use client';

// Libs
import { Controller, useWatch } from 'react-hook-form';

import { Session } from 'next-auth';

// Constants
import { TRANSFER_FORM_ACCOUNT_OPTIONS } from '@/constants';

// Components
import { Button, Input, Select, SendIcon, Text } from '@/components';

// Schemas
import { InternalTransferFormSchema } from '@/schemas';

// Context
import { useWizardFormContext } from '@/context';

interface IInternalTransferFormProps {
  session: Session;
}

export const InternalTransferForm = ({
  session,
}: IInternalTransferFormProps) => {
  const {
    form: {
      control,
      formState: { errors },
    },
    nextStep,
    isStepValid,
  } = useWizardFormContext<typeof InternalTransferFormSchema>();

  const fromAccountTypeValue = useWatch({
    control,
    name: 'fromAccountType',
  });

  const toAccountTypeValue = useWatch({
    control,
    name: 'toAccountType',
  });

  // TODO: Handle fetch balance by user ID and account type
  console.log(session);

  return (
    <form className='flex flex-col gap-4'>
      {/* Title */}
      <Text as='h4' className='text-xs font-medium'>
        Send Money Across Your eWallet Accounts
      </Text>

      {/* Account receive */}
      <Controller
        control={control}
        name='toAccountType'
        render={({ field: { onChange, onBlur, value } }) => {
          const filteredOptions = TRANSFER_FORM_ACCOUNT_OPTIONS.filter(
            (option) => option.key !== fromAccountTypeValue,
          );

          return (
            <>
              <Select
                label='To'
                labelPlacement='outside'
                options={filteredOptions}
                classNames={{ label: 'text-sm' }}
                value={String(value)}
                errorMessage={errors.toAccountType?.message}
                isInvalid={!!errors.toAccountType}
                onSelectionChange={(keys) => {
                  const selectedValue = String(Array.from(keys)[0]);
                  onChange(selectedValue);
                }}
                onClose={onBlur}
              />
              <Text
                as='span'
                className='text-xs text-foreground-200 opacity-50'
              >
                Available Balance:{' '}
              </Text>
            </>
          );
        }}
      />

      {/* Account send */}
      <Controller
        control={control}
        name='fromAccountType'
        render={({ field: { onChange, onBlur, value } }) => {
          const filteredOptions = TRANSFER_FORM_ACCOUNT_OPTIONS.filter(
            (option) => option.key !== toAccountTypeValue,
          );

          return (
            <>
              <Select
                label='From'
                labelPlacement='outside'
                options={filteredOptions}
                classNames={{ label: 'text-sm' }}
                value={String(value)}
                errorMessage={errors.fromAccountType?.message}
                isInvalid={!!errors.fromAccountType}
                onSelectionChange={(keys) => {
                  const selectedValue = String(Array.from(keys)[0]);
                  onChange(selectedValue);
                }}
                onClose={onBlur}
              />
              <Text
                as='span'
                className='text-xs text-foreground-200 opacity-50'
              >
                Available Balance:{' '}
              </Text>
            </>
          );
        }}
      />

      {/* Amount */}
      <Controller
        control={control}
        name='amount'
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            inputMode='decimal'
            label='Amount'
            labelPlacement='outside'
            placeholder=' '
            classNames={{
              inputWrapper: 'px-2.5 py-2 rounded-sm border-default',
              input: 'm-0 text-xs text-primary-200 font-medium',
            }}
            value={String(value)}
            errorMessage={errors.amount?.message}
            isInvalid={!!errors.amount}
            onChange={onChange}
            onBlur={onBlur}
          />
        )}
      />

      <Button
        type='submit'
        startContent={<SendIcon />}
        className='bg-primary-200 font-semibold text-foreground-200'
        isDisabled={!isStepValid}
        onClick={nextStep}
      >
        Transfer Funds
      </Button>
    </form>
  );
};
