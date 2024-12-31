'use client';

import { useState, useTransition } from 'react';
import { Controller } from 'react-hook-form';
import { RadioGroup } from '@nextui-org/react';
import { z } from 'zod';

// Interfaces
import { AccountType, IAccount, TEXT_SIZE, TEXT_VARIANT } from '@/interfaces';

// Context
import { useWizardFormContext } from '@/context';

// Utils
import { formatYearMonthToShortDate } from '@/utils';

// Components
import { Button, Input, RadioButton, Text } from '@/components/common';
import { CreditCard, VariantsCard } from '@/components/CreditCard';
import { CreditCardIcon } from '@/components/icons';

interface IConfirmAddCard<T extends z.ZodType> {
  schema: T;
  accounts?: IAccount[];
  submitHandler: (id: string, data: z.infer<T>) => void;
}

export const ConfirmAddCard = <T extends z.ZodType>({
  accounts = [],
  submitHandler,
}: IConfirmAddCard<T>) => {
  const {
    form: { control, handleSubmit, getValues },
    validateStep,
    onNextStep,
  } = useWizardFormContext();

  const values = getValues();
  const { fullName, cardNumber, expireAt } = values;
  const [isPending, startTransition] = useTransition();
  const [selectedType, setSelectedType] = useState<string>(
    accounts[0]?.type || AccountType.MAIN,
  );

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    startTransition(() => {
      const handler = handleSubmit((formData) => {
        const selectedAccount = accounts.find(
          (account) => account.type === selectedType,
        );

        submitHandler(selectedAccount?.documentId as string, formData);
      });

      handler(e);
      onNextStep(e);
    });
  };

  return (
    <>
      <Text as='h2' variant={TEXT_VARIANT.DEFAULT}>
        Credit Card
      </Text>
      <div className='mt-[10px] flex flex-col justify-between'>
        <div className='flex w-full items-center justify-between gap-[19px]'>
          <CreditCard
            cardNumber={cardNumber}
            holderName={fullName}
            isModal={true}
            expireDate={formatYearMonthToShortDate(expireAt)}
            variant={selectedType.toLowerCase() as VariantsCard}
          />

          <div className='flex flex-1 flex-col gap-[15px]'>
            <Controller
              control={control}
              name='holderName'
              render={({ field, fieldState: { error } }) => (
                <Input
                  labelPlacement='outside'
                  label='Holder’s Name'
                  aria-label='name-of-the-holder'
                  placeholder='Holder’s Name'
                  size='sm'
                  classNames={{
                    input: 'm-0 text-2xs p-0 font-bold',
                    label: 'text-xs !text-black',
                  }}
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
                  aria-label='credit-card-number'
                  placeholder='Card Number'
                  classNames={{
                    input: 'm-0 text-2xs p-0 font-bold',
                    label: 'text-xs !text-black',
                  }}
                  size='sm'
                  type='text'
                  maxLength={12}
                  isInvalid={!!error?.message}
                  errorMessage={error?.message}
                  endContent={<CreditCardIcon />}
                  isDisabled
                  {...field}
                />
              )}
            />
          </div>
        </div>
        <div className='mt-[19px]'>
          <Text variant={TEXT_VARIANT.DEFAULT} size={TEXT_SIZE.XS}>
            How may wallets will your Card have
          </Text>
          <Text as='span' size={TEXT_SIZE['2XS']} className='!text-neutralGray'>
            Please note that all cards must have a main wallet
          </Text>

          <Controller
            control={control}
            name='walletType'
            render={({ field }) => (
              <RadioGroup
                defaultValue={selectedType}
                onChange={(event) => {
                  const value = event.target.value;
                  field.onChange(value);
                  setSelectedType(value);
                }}
                className='mt-[20px]'
              >
                {accounts.map((account) => (
                  <RadioButton key={account.id} value={account.type}>
                    {account.type === AccountType.MAIN
                      ? `${account.type} Wallet`
                      : account.type}
                  </RadioButton>
                ))}
              </RadioGroup>
            )}
          />
        </div>

        <Button
          type='button'
          color='primary'
          className='mx-auto mt-[30px] max-w-[320px]'
          isDisabled={!validateStep()}
          isLoading={isPending}
          onClick={onSubmit}
        >
          Confirm
        </Button>
      </div>
    </>
  );
};
