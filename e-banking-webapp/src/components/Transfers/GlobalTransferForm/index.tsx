'use client';

// Third Party
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm, useWatch } from 'react-hook-form';

// Constants
import {
  OPTIONS_COUNTRY_CODE_CONVERT_GLOBAL,
  TRANSFER_FORM_GLOBAL_OPTIONS,
} from '@/constants';

// Models
import { InternalTransferForm as InternalTransferFormType } from '@/interfaces';
import { GlobalTransferFormSchema } from '@/schemas';

// Components
import { Button, Input, Select, Text, SendIcon } from '@/components';

interface IGlobalTransferForm {
  balanceLabel?: string;
}

export const GlobalTransferForm = ({ balanceLabel }: IGlobalTransferForm) => {
  const {
    control,
    formState: { errors, isValid, isDirty },
  } = useForm<InternalTransferFormType>({
    mode: 'all',
    defaultValues: {
      fromAccountType: undefined,
      toAccountType: undefined,
      amount: 0,
    },
    resolver: zodResolver(GlobalTransferFormSchema),
  });

  const fromGlobalTypeValue = useWatch({
    control,
    name: 'fromAccountType',
  });

  const toAccountTypeValue = useWatch({
    control,
    name: 'toAccountType',
  });

  const countryCode = () =>
    OPTIONS_COUNTRY_CODE_CONVERT_GLOBAL.find(
      (option) => option.key === toAccountTypeValue,
    )?.label || '';

  const filteredFromAccountOptions = () =>
    TRANSFER_FORM_GLOBAL_OPTIONS.filter(
      (option) => option.key !== toAccountTypeValue,
    );

  const filteredToAccountOptions = () =>
    TRANSFER_FORM_GLOBAL_OPTIONS.filter(
      (option) => option.key !== fromGlobalTypeValue,
    );

  return (
    <form className='flex flex-col gap-4'>
      {/* Title */}
      <Text as='h4' className='text-xs font-medium'>
        Send Money Across The Global with Ease
      </Text>

      {/* Country */}
      <Controller
        control={control}
        name='toAccountType'
        render={({ field: { onChange, onBlur, value } }) => {
          return (
            <Select
              label='Country'
              labelPlacement='outside'
              options={filteredToAccountOptions()}
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
          );
        }}
      />

      {/* Account */}
      <Controller
        control={control}
        name='fromAccountType'
        render={({ field: { onChange, onBlur, value } }) => {
          return (
            <>
              <Select
                label='Account'
                labelPlacement='outside'
                options={filteredFromAccountOptions()}
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
                Available Balance:{balanceLabel}
              </Text>
            </>
          );
        }}
      />

      {/* Amount */}
      <Controller
        control={control}
        name='amount'
        render={({ field: { onChange, onBlur, value } }) => {
          return (
            <div className='flex items-baseline gap-[15px]'>
              <Input
                value={countryCode()}
                readOnly
                classNames={{
                  base: 'w-11',
                  inputWrapper:
                    'w-11 h-10 rounded-sm border-default box-border p-0',
                  input: 'font-semibold text-navyBlue text-xs text-center',
                }}
              />
              <Input
                inputMode='decimal'
                label='Amount'
                labelPlacement='outside'
                placeholder=' '
                classNames={{
                  inputWrapper:
                    'h-10 px-2.5 py-2 rounded-sm border-default box-border',
                  input: 'm-0 text-xs text-primary-200 font-medium',
                }}
                value={String(value)}
                errorMessage={errors.amount?.message}
                isInvalid={!!errors.amount}
                onChange={onChange}
                onBlur={onBlur}
              />
            </div>
          );
        }}
      />

      <Button
        type='submit'
        startContent={<SendIcon />}
        className='bg-primary-200 font-semibold text-foreground-200'
        isDisabled={!isValid || !isDirty}
      >
        Transfer Funds
      </Button>
    </form>
  );
};
