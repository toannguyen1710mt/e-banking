'use client';

// Third Party
import { Controller, useWatch } from 'react-hook-form';
import { Session } from 'next-auth';
import { z } from 'zod';
import { useEffect, useState } from 'react';
import { Spinner } from '@nextui-org/react';

// Constants
import {
  OPTIONS_COUNTRY_CODE_CONVERT_GLOBAL,
  TRANSFER_FORM_ACCOUNT_OPTIONS,
  TRANSFER_FORM_GLOBAL_OPTIONS,
} from '@/constants';

// Interfaces
import { AccountType, GlobalType } from '@/interfaces';

// API
import { getAccountInfoByAccountType } from '@/services';

// Helpers / Utils
import { formatNumberWithCommas } from '@/utils';
import { GlobalTransferFormSchema } from '@/schemas';

// Components
import { Button, Input, Select, Text, SendIcon } from '@/components';
import { useWizardFormContext } from '@/context';

type FormValues = keyof z.infer<typeof GlobalTransferFormSchema>;

export const GlobalTransferForm = ({ session }: { session: Session }) => {
  const {
    form: { control, setValue },
    nextStep,
    isStepValid,
  } = useWizardFormContext<typeof GlobalTransferFormSchema>();

  const hiddenFields: FormValues[] = [
    'fromAccountId',
    'fromCardName',
    'fromAccountNumber',
    'fromAccountBalance',
  ];

  const fromAccountTypeValue = useWatch({
    control,
    name: 'fromAccountType',
  });

  const fromCountryType = useWatch({
    control,
    name: 'fromCountryType',
  });

  // States for fetching
  const [isFetchingBalanceSend, setIsFetchingBalanceSend] = useState(false);

  // States for balances
  const [balanceSend, setBalanceSend] = useState<number | null>(null);

  useEffect(() => {
    const fetchBalanceSend = async () => {
      if (!fromAccountTypeValue) {
        setBalanceSend(null);
        return;
      }

      try {
        setIsFetchingBalanceSend(true);

        const balance = await getAccountInfoByAccountType(
          session.user.id,
          fromAccountTypeValue,
          'balance',
        );

        const accountId = await getAccountInfoByAccountType(
          session.user.id,
          fromAccountTypeValue,
          'documentId',
        );

        const fromCardName = await getAccountInfoByAccountType(
          session.user.id,
          fromAccountTypeValue,
          'name',
        );

        const fromAccountNumber = await getAccountInfoByAccountType(
          session.user.id,
          fromAccountTypeValue,
          'accountNumber',
        );

        setBalanceSend(Number(balance));
        setValue('fromAccountId', String(accountId));
        setValue('fromCardName', String(fromCardName));
        setValue('fromAccountNumber', String(fromAccountNumber));
        setValue('fromAccountBalance', Number(balance));
      } catch (error) {
        console.error('Error fetching balance for send account:', error);
      } finally {
        setIsFetchingBalanceSend(false);
      }
    };

    fetchBalanceSend();
  }, [fromAccountTypeValue, session.user.id, setValue]);

  const countryCode = () =>
    OPTIONS_COUNTRY_CODE_CONVERT_GLOBAL.find(
      (option) => option.key === fromCountryType,
    )?.label || '';

  const filteredFromAccountOptions = () =>
    TRANSFER_FORM_ACCOUNT_OPTIONS.filter(
      (option) => option.key !== (fromCountryType as unknown as AccountType),
    );

  const filteredToAccountOptions = () =>
    TRANSFER_FORM_GLOBAL_OPTIONS.filter(
      (option) =>
        option.key !== (fromAccountTypeValue as unknown as GlobalType),
    );

  return (
    <div className='flex w-full flex-col gap-4'>
      {/* Title */}
      <Text as='h4' className='text-xs font-medium'>
        Send Money Across The Global with Ease
      </Text>

      {/* Country */}
      <Controller
        control={control}
        name='fromCountryType'
        render={({
          field: { onChange, onBlur, value },
          fieldState: { error },
        }) => {
          return (
            <Select
              label='Country'
              labelPlacement='outside'
              options={filteredToAccountOptions()}
              classNames={{ label: 'text-sm' }}
              value={String(value)}
              errorMessage={error?.message}
              isInvalid={!!error?.message}
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
        render={({
          field: { onChange, onBlur, value },
          fieldState: { error },
        }) => {
          return (
            <Select
              label='Account'
              labelPlacement='outside'
              options={filteredFromAccountOptions()}
              classNames={{ label: 'text-sm' }}
              value={String(value)}
              errorMessage={error?.message}
              isInvalid={!!error?.message}
              isDisabled={isFetchingBalanceSend}
              onSelectionChange={(keys) => {
                const selectedValue = String(Array.from(keys)[0]);
                onChange(selectedValue);
              }}
              onClose={onBlur}
            />
          );
        }}
      />

      {/* Recipient Account */}
      {fromAccountTypeValue && (
        <Controller
          control={control}
          name='recipientAccount'
          render={({ field: { onChange, onBlur }, fieldState: { error } }) => {
            return (
              <Input
                label='Recipient Account'
                labelPlacement='outside'
                placeholder=' '
                classNames={{
                  inputWrapper:
                    'h-10 px-2.5 py-2 rounded-sm border-default box-border',
                  input: 'm-0 text-xs text-primary-200 font-medium',
                }}
                errorMessage={error?.message}
                isInvalid={!!error?.message}
                onChange={onChange}
                onBlur={onBlur}
              />
            );
          }}
        />
      )}

      {/* Available Balance */}
      <div className='flex items-center gap-2'>
        <Text as='span' className='text-xs text-foreground-200 opacity-50'>
          Available Balance:
        </Text>
        <Text as='span' className='text-xs text-foreground-200 opacity-50'>
          {isFetchingBalanceSend ? (
            <Spinner size='sm' />
          ) : (
            balanceSend && `$${formatNumberWithCommas(balanceSend)}`
          )}
        </Text>
      </div>

      {/* Amount */}
      <Controller
        control={control}
        name='amount'
        render={({
          field: { onChange, onBlur, value },
          fieldState: { error },
        }) => {
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
                errorMessage={error?.message}
                isInvalid={!!error?.message}
                onChange={onChange}
                onBlur={onBlur}
              />
            </div>
          );
        }}
      />

      {/* Hidden Fields */}
      {hiddenFields.map((fieldName) => (
        <Controller
          key={fieldName}
          control={control}
          name={fieldName}
          render={({ field: { value } }) => (
            <Input value={String(value)} className='hidden' />
          )}
        />
      ))}

      <Button
        type='submit'
        startContent={<SendIcon />}
        className='bg-primary-200 font-semibold text-foreground-200'
        onClick={nextStep}
        isDisabled={!isStepValid}
      >
        Transfer Funds
      </Button>
    </div>
  );
};
