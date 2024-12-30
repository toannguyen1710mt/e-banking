'use client';

// Libs
import { z } from 'zod';
import { useEffect, useState } from 'react';
import { Controller, useWatch } from 'react-hook-form';
import { Spinner } from '@nextui-org/react';

import { Session } from 'next-auth';

// Constants
import { TRANSFER_FORM_ACCOUNT_OPTIONS } from '@/constants';

// Components
import { Button, Input, Select, SendIcon, Text } from '@/components';

// Schemas
import { InternalTransferFormSchema } from '@/schemas';

// Context
import { useWizardFormContext } from '@/context';

// Services
import { getAccountInfoByAccountType } from '@/services';

// Utils
import { formatNumberWithCommas } from '@/utils';

type FormValues = keyof z.infer<typeof InternalTransferFormSchema>;
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
      setValue,
    },
    onNextStep,
    validateStep,
  } = useWizardFormContext<typeof InternalTransferFormSchema>();

  const hiddenFields: FormValues[] = [
    'fromAccountId',
    'toAccountId',
    'fromCardName',
    'toCardName',
    'fromAccountNumber',
    'toAccountNumber',
    'fromAccountBalance',
    'toAccountBalance',
  ];

  const fromAccountTypeValue = useWatch({
    control,
    name: 'fromAccountType',
  });

  const toAccountTypeValue = useWatch({
    control,
    name: 'toAccountType',
  });

  // States for fetching
  const [isFetchingBalanceSend, setIsFetchingBalanceSend] = useState(false);
  const [isFetchingBalanceReceive, setIsFetchingBalanceReceive] =
    useState(false);

  // States for balances
  const [balanceSend, setBalanceSend] = useState<number | null>(null);
  const [balanceReceive, setBalanceReceive] = useState<number | null>(null);

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

  useEffect(() => {
    const fetchBalanceReceive = async () => {
      if (!toAccountTypeValue) {
        setBalanceReceive(null);
        return;
      }
      try {
        setIsFetchingBalanceReceive(true);

        const balance = await getAccountInfoByAccountType(
          session.user.id,
          toAccountTypeValue,
          'balance',
        );

        const documentId = await getAccountInfoByAccountType(
          session.user.id,
          toAccountTypeValue,
          'documentId',
        );

        const toCardName = await getAccountInfoByAccountType(
          session.user.id,
          toAccountTypeValue,
          'name',
        );

        const toAccountNumber = await getAccountInfoByAccountType(
          session.user.id,
          toAccountTypeValue,
          'accountNumber',
        );

        setBalanceReceive(Number(balance));
        setValue('toAccountId', String(documentId));
        setValue('toCardName', String(toCardName));
        setValue('toAccountNumber', String(toAccountNumber));
        setValue('toAccountBalance', Number(balance));
      } catch (error) {
        console.error('Error fetching balance for receive account:', error);
      } finally {
        setIsFetchingBalanceReceive(false);
      }
    };

    fetchBalanceReceive();
  }, [toAccountTypeValue, session.user.id, setValue]);

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
              <div className='flex items-center gap-2'>
                <Text
                  as='span'
                  className='text-xs text-foreground-200 opacity-50'
                >
                  Available Balance:
                </Text>
                <Text
                  as='span'
                  className='text-xs text-foreground-200 opacity-50'
                >
                  {isFetchingBalanceReceive ? (
                    <Spinner size='sm' />
                  ) : (
                    balanceReceive &&
                    `$${formatNumberWithCommas(balanceReceive)}`
                  )}
                </Text>
              </div>
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
              <div className='flex items-center gap-2'>
                <Text
                  as='span'
                  className='text-xs text-foreground-200 opacity-50'
                >
                  Available Balance:
                </Text>
                <Text
                  as='span'
                  className='text-xs text-foreground-200 opacity-50'
                >
                  {isFetchingBalanceSend ? (
                    <Spinner size='sm' />
                  ) : (
                    balanceSend && `$${formatNumberWithCommas(balanceSend)}`
                  )}
                </Text>
              </div>
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
        isDisabled={!validateStep()}
        onClick={onNextStep}
      >
        Transfer Funds
      </Button>
    </form>
  );
};
