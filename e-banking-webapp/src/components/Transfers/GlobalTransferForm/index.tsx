'use client';

// Third Party
import { Controller, useWatch } from 'react-hook-form';
import { Session } from 'next-auth';
import { z } from 'zod';
import { useEffect, useState, useTransition } from 'react';
import { Spinner } from '@nextui-org/react';

// Constants
import {
  ERROR_MESSAGES,
  OPTIONS_COUNTRY_CODE_CONVERT_GLOBAL,
  TRANSFER_FORM_ACCOUNT_OPTIONS,
  TRANSFER_FORM_GLOBAL_OPTIONS,
} from '@/constants';

// Interfaces
import { AccountType, GlobalAccount, GlobalType } from '@/interfaces';

// API
import { getAccountInfoByAccountType, getGlobalAccounts } from '@/services';

// Helpers / Utils
import {
  convertToUSD,
  formatNumberWithCommas,
  isValidNumber,
  sanitizeNumber,
} from '@/utils';
import { GlobalTransferFormSchema } from '@/schemas';

// Components
import { Button, Input, Select, Text, SendIcon } from '@/components';

// Contexts
import { useFetchedBalances, useWizardFormContext } from '@/context';

type FormValues = keyof z.infer<typeof GlobalTransferFormSchema>;

export const GlobalTransferForm = ({ session }: { session: Session }) => {
  const {
    form: {
      control,
      formState: { errors },
      setValue,
      getValues,
      setError,
      clearErrors,
    },
    onNextStep,
  } = useWizardFormContext<typeof GlobalTransferFormSchema>();

  const hiddenFields: FormValues[] = [
    'fromAccountId',
    'fromCardName',
    'fromAccountNumber',
    'fromAccountBalance',
    'recipientName',
  ];

  const fromAccountTypeValue = useWatch({
    control,
    name: 'globalTransfer.fromAccountType',
  });

  const fromCountryType = useWatch({
    control,
    name: 'globalTransfer.fromCountryType',
  });

  const allFieldValues = getValues();

  const amountValueInUSD = convertToUSD(
    allFieldValues.globalTransfer.fromCountryType,
    Number(allFieldValues.globalTransfer.amount),
  );

  const [isPending, startTransition] = useTransition();

  // States for global accounts
  const [isFetchingGlobalAccounts, setIsFetchingGlobalAccounts] =
    useState(false);
  const [selectedGlobalAccount, setSelectedGlobalAccount] =
    useState<GlobalAccount | null>(null);

  // States for balances
  const [balanceSend, setBalanceSend] = useState<number | null>(null);
  const [rawAmount, setRawAmount] = useState<string>('');
  const [amountError, setAmountError] = useState<string | null>(null);

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

      startTransition(async () => {
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

          startTransition(() => {
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
  }, [
    fromAccountTypeValue,
    session.user.id,
    setValue,
    fetchedBalances,
    setFetchedBalances,
  ]);

  const countryCode = () => {
    return (
      OPTIONS_COUNTRY_CODE_CONVERT_GLOBAL.find(
        (option) => option.key === fromCountryType,
      )?.label || ''
    );
  };

  const filteredFromAccountOptions = () =>
    TRANSFER_FORM_ACCOUNT_OPTIONS.filter(
      (option) => option.key !== (fromCountryType as unknown as AccountType),
    );

  const filteredToAccountOptions = () =>
    TRANSFER_FORM_GLOBAL_OPTIONS.filter(
      (option) =>
        option.key !== (fromAccountTypeValue as unknown as GlobalType),
    );

  const handleInputChange = (
    value: string,
    onChange: (value: string) => void,
  ) => {
    const sanitizedValue = sanitizeNumber(value);

    if (isValidNumber(sanitizedValue)) {
      setRawAmount(sanitizedValue);

      if (balanceSend && amountValueInUSD > balanceSend) {
        setAmountError(
          `${ERROR_MESSAGES.AMOUNT_EXCEEDED_BALANCE} $${formatNumberWithCommas(balanceSend)}`,
        );
      } else {
        setAmountError(null);
      }

      onChange(sanitizedValue);
    }
  };

  const getFormattedAmount = (
    rawAmount: string,
    value: string | number,
  ): string => {
    if (rawAmount) {
      return formatNumberWithCommas(Number(rawAmount));
    }

    if (String(value) !== '') {
      return formatNumberWithCommas(Number(value));
    }

    return '';
  };

  const handleAccountErrors = (accountMatch: GlobalAccount | undefined) => {
    if (accountMatch) {
      setSelectedGlobalAccount(accountMatch);
      clearErrors('globalTransfer.recipientAccount');
    } else {
      setError('globalTransfer.recipientAccount', {
        message: ERROR_MESSAGES.RECIPIENT_ACCOUNT_INVALID,
      });
    }
  };

  const validateRecipientAccount = async (value: string) => {
    if (!value) {
      setSelectedGlobalAccount(null);
      return;
    }

    setIsFetchingGlobalAccounts(true);
    try {
      const response = await getGlobalAccounts();

      const accountMatch = response.data.find(
        (account) =>
          account.accountNumber === value && account.currency === countryCode(),
      );

      if (value) {
        handleAccountErrors(accountMatch);
      } else {
        setError('globalTransfer.recipientAccount', {
          message: ERROR_MESSAGES.FIELD_REQUIRED,
        });
      }
    } catch (error) {
      console.error('Failed to fetch global accounts:', error);
    } finally {
      setIsFetchingGlobalAccounts(false);
    }
  };

  useEffect(() => {
    if (fromCountryType && getValues('globalTransfer.recipientAccount')) {
      validateRecipientAccount(getValues('globalTransfer.recipientAccount'));
    }
  }, [fromCountryType]);

  useEffect(() => {
    if (selectedGlobalAccount) {
      setValue('recipientName', selectedGlobalAccount.name);
    }
  }, [selectedGlobalAccount, setValue]);

  const disableButtonSubmit =
    !fromAccountTypeValue ||
    !fromCountryType ||
    !allFieldValues.globalTransfer.recipientAccount ||
    !allFieldValues.globalTransfer.amount ||
    !!errors.globalTransfer?.recipientAccount ||
    !!errors.globalTransfer?.amount ||
    !!amountError;

  return (
    <div className='flex w-full flex-col gap-4'>
      {/* Title */}
      <Text as='h4' className='text-xs font-medium'>
        Send Money Across The Global with Ease
      </Text>

      {/* Country */}
      <Controller
        control={control}
        name='globalTransfer.fromCountryType'
        render={({ field: { onChange, onBlur, value } }) => {
          return (
            <Select
              label='Country'
              labelPlacement='outside'
              options={filteredToAccountOptions()}
              classNames={{ label: 'text-sm' }}
              value={String(value)}
              errorMessage={errors.globalTransfer?.fromCountryType?.message}
              isInvalid={!!errors.globalTransfer?.fromCountryType}
              selectedKeys={value ? [String(value)] : []}
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
        name='globalTransfer.fromAccountType'
        render={({ field: { onChange, onBlur, value } }) => {
          return (
            <Select
              label='Account'
              labelPlacement='outside'
              options={filteredFromAccountOptions()}
              classNames={{ label: 'text-sm' }}
              value={String(value)}
              errorMessage={errors.globalTransfer?.fromAccountType?.message}
              isInvalid={!!errors.globalTransfer?.fromAccountType}
              selectedKeys={value ? [String(value)] : []}
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
          name='globalTransfer.recipientAccount'
          render={({ field: { value, onChange } }) => {
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
                value={value}
                errorMessage={errors.globalTransfer?.recipientAccount?.message}
                isInvalid={!!errors.globalTransfer?.recipientAccount}
                onChange={onChange}
                onBlur={() => {
                  validateRecipientAccount(value);
                }}
                maxLength={12}
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
          {isPending ? (
            <Spinner size='sm' />
          ) : (
            balanceSend && `$${formatNumberWithCommas(balanceSend)}`
          )}
        </Text>
      </div>

      {/* Amount */}
      <Controller
        control={control}
        name='globalTransfer.amount'
        render={({
          field: { onBlur, value, onChange },
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
                value={getFormattedAmount(rawAmount, value)}
                onChange={(e) =>
                  handleInputChange(e.target.value.replace(/^\$/, ''), onChange)
                }
                errorMessage={amountError || error?.message}
                isInvalid={!!amountError || !!error?.message}
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
            <Input
              value={
                fieldName === 'recipientName'
                  ? getValues('recipientName')
                  : String(value)
              }
              className='hidden'
            />
          )}
        />
      ))}

      <Button
        type='submit'
        startContent={<SendIcon />}
        className='bg-primary-200 font-semibold text-foreground-200'
        onClick={onNextStep}
        isDisabled={disableButtonSubmit}
      >
        Transfer Funds
      </Button>

      {isFetchingGlobalAccounts && (
        <div className='absolute inset-0 z-40 flex items-center justify-center rounded-xl bg-background-400/30'>
          <Spinner size='sm' color='success' />
        </div>
      )}
    </div>
  );
};
