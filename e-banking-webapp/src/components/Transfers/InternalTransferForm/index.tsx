'use client';

// Libs
import { z } from 'zod';
import { useEffect, useState, useTransition } from 'react';
import { Controller, useWatch } from 'react-hook-form';
import { Spinner } from '@nextui-org/react';
import { Session } from 'next-auth';

// Constants
import { ERROR_MESSAGES, TRANSFER_FORM_ACCOUNT_OPTIONS } from '@/constants';

// Components
import { Button, Input, Select, SendIcon, Text } from '@/components';

// Schemas
import { InternalTransferFormSchema } from '@/schemas';

// Context
import { useWizardFormContext, useFetchedBalances } from '@/context';

// Services
import { getAccountInfoByAccountType } from '@/services';

// Utils
import { formatNumberWithCommas, isValidNumber, sanitizeNumber } from '@/utils';

type FormValues = keyof z.infer<typeof InternalTransferFormSchema>;

interface IInternalTransferFormProps {
  session: Session;
}

export const InternalTransferForm = ({
  session,
}: IInternalTransferFormProps) => {
  const {
    form: { control, setValue, getValues },
    onNextStep,
    validateStep,
  } = useWizardFormContext<typeof InternalTransferFormSchema>();
  const [rawAmount, setRawAmount] = useState<string>('');
  const [amountError, setAmountError] = useState<string | null>(null);

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
    name: 'internalTransfer.fromAccountType',
  });

  const toAccountTypeValue = useWatch({
    control,
    name: 'internalTransfer.toAccountType',
  });

  const amountValue = getValues('internalTransfer.amount');

  const [isPendingFrom, startTransitionFrom] = useTransition();
  const [isPendingTo, startTransitionTo] = useTransition();

  // States for balances
  const [balanceSend, setBalanceSend] = useState<number | null>(null);
  const [balanceReceive, setBalanceReceive] = useState<number | null>(null);

  // Cached balance data
  const { fetchedBalances, setFetchedBalances } = useFetchedBalances();

  useEffect(() => {
    const fetchBalanceSend = async () => {
      if (
        !fromAccountTypeValue ||
        fetchedBalances[fromAccountTypeValue] !== undefined
      ) {
        setBalanceSend(fetchedBalances[fromAccountTypeValue] || null);
        return;
      }

      startTransitionFrom(async () => {
        try {
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

          startTransitionFrom(() => {
            setBalanceSend(Number(balance));
            setFetchedBalances((prev) => ({
              ...prev,
              [fromAccountTypeValue]: Number(balance),
            }));
            setValue('fromAccountId', String(accountId));
            setValue('fromCardName', String(fromCardName));
            setValue('fromAccountNumber', String(fromAccountNumber));
            setValue('fromAccountBalance', Number(balance));
          });
        } catch (error) {
          console.error(ERROR_MESSAGES.GET_BALANCE_FOR_ACCOUNT, error);
        }
      });
    };

    fetchBalanceSend();
  }, [fromAccountTypeValue, session.user.id, fetchedBalances]);

  useEffect(() => {
    const fetchBalanceReceive = async () => {
      if (
        !toAccountTypeValue ||
        fetchedBalances[toAccountTypeValue] !== undefined
      ) {
        setBalanceReceive(fetchedBalances[toAccountTypeValue] || null);
        return;
      }

      startTransitionTo(async () => {
        try {
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

          startTransitionTo(() => {
            setBalanceReceive(Number(balance));
            setFetchedBalances((prev) => ({
              ...prev,
              [toAccountTypeValue]: Number(balance),
            }));
            setValue('toAccountId', String(documentId));
            setValue('toCardName', String(toCardName));
            setValue('toAccountNumber', String(toAccountNumber));
            setValue('toAccountBalance', Number(balance));
          });
        } catch (error) {
          console.error('Error fetching balance for receive account:', error);
        }
      });
    };

    fetchBalanceReceive();
  }, [toAccountTypeValue, session.user.id, fetchedBalances]);

  const handleAmountErrors = (balanceSend: number | null, amount: number) => {
    setAmountError(
      balanceSend && amount > balanceSend
        ? `${ERROR_MESSAGES.AMOUNT_EXCEEDED_BALANCE} $${formatNumberWithCommas(
            balanceSend,
          )}`
        : null,
    );
  };

  const handleInputChange = (
    value: string,
    onChange: (value: string) => void,
  ) => {
    const sanitizedValue = sanitizeNumber(value);

    if (isValidNumber(sanitizedValue)) {
      setRawAmount(sanitizedValue);

      const amount = Number(sanitizedValue);

      handleAmountErrors(balanceSend, amount);

      onChange(sanitizedValue);
    }
  };

  useEffect(() => {
    if (fromAccountTypeValue && amountValue) {
      handleAmountErrors(balanceSend, Number(amountValue));
    }
  }, [amountValue, balanceSend, fromAccountTypeValue]);

  const getFormattedAmount = (
    rawAmount: string,
    value: string | number,
  ): string => {
    if (rawAmount) {
      return `$${formatNumberWithCommas(Number(rawAmount))}`;
    }

    if (String(value) !== '') {
      return `$${formatNumberWithCommas(Number(value))}`;
    }

    return '';
  };

  return (
    <div className='flex flex-col gap-4'>
      {/* Title */}
      <Text as='h4' className='text-xs font-medium'>
        Send Money Across Your eWallet Accounts
      </Text>

      {/* Account receive */}
      <Controller
        control={control}
        name='internalTransfer.toAccountType'
        render={({
          field: { onChange, onBlur, value },
          fieldState: { error },
        }) => {
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
                errorMessage={error?.message}
                isInvalid={!!error?.message}
                selectedKeys={value ? [String(value)] : []}
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
                  {isPendingTo ? (
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
        name='internalTransfer.fromAccountType'
        render={({
          field: { onChange, onBlur, value },
          fieldState: { error },
        }) => {
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
                errorMessage={error?.message}
                isInvalid={!!error?.message}
                selectedKeys={value ? [String(value)] : []}
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
                  {isPendingFrom ? (
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
        name='internalTransfer.amount'
        render={({
          field: { onBlur, value, onChange },
          fieldState: { error },
        }) => (
          <Input
            inputMode='decimal'
            label='Amount'
            labelPlacement='outside'
            placeholder=' '
            classNames={{
              inputWrapper: 'px-2.5 py-2 rounded-sm border-default',
              input: 'm-0 text-xs text-primary-200 font-medium',
            }}
            value={getFormattedAmount(rawAmount, value)}
            errorMessage={amountError || error?.message}
            isInvalid={!!amountError || !!error?.message}
            onChange={(e) =>
              handleInputChange(e.target.value.replace(/^\$/, ''), onChange)
            }
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
        type='button'
        startContent={<SendIcon />}
        className='bg-primary-200 font-semibold text-foreground-200'
        isDisabled={!validateStep() || !!amountError}
        onClick={onNextStep}
      >
        Transfer Funds
      </Button>
    </div>
  );
};
