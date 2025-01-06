'use client';

import { useState } from 'react';
import { Controller } from 'react-hook-form';
import { RadioGroup } from '@nextui-org/react';

// Interfaces
import { AccountType, IAccount, TEXT_SIZE, TEXT_VARIANT } from '@/interfaces';

// Context
import { useWizardFormContext } from '@/context';

// Utils
import { formatYearMonthToShortDate } from '@/utils';

// Schemas
import { CreditCardSchema } from '@/schemas';

// Components
import { Button, Input, RadioButton, Text } from '@/components/common';
import { CreditCard, VariantsCard } from '@/components/CreditCard';
import { CreditCardIcon } from '@/components/icons';

interface IConfirmAddCard {
  accounts?: IAccount[];
  isPending: boolean;
}

export const ConfirmAddCard = ({
  accounts = [],
  isPending,
}: IConfirmAddCard) => {
  const {
    form: { control, getValues },
    validateStep,
  } = useWizardFormContext<typeof CreditCardSchema>();

  const values = getValues();
  const { holderName, cardNumber, expireAt } = values.cardInfo;

  const [selectedType, setSelectedType] = useState<string>(
    accounts[0]?.type || AccountType.MAIN,
  );

  return (
    <>
      <Text as='h2' variant={TEXT_VARIANT.DEFAULT}>
        Credit Card
      </Text>

      <div className='mt-[10px] flex flex-col justify-between'>
        <div className='flex w-full items-center justify-between gap-[19px]'>
          <CreditCard
            cardNumber={cardNumber}
            holderName={holderName}
            isModal={true}
            expireDate={formatYearMonthToShortDate(expireAt)}
            variant={selectedType.toLowerCase() as VariantsCard}
          />

          <div className='flex flex-1 flex-col gap-[15px]'>
            <Controller
              control={control}
              name='cardInfo.holderName'
              render={({ field }) => (
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
                  {...field}
                  readOnly
                />
              )}
            />

            <Input
              labelPlacement='outside'
              label='Credit Card Number'
              aria-label='credit-card-number'
              placeholder='Card Number'
              classNames={{
                input: 'm-0 text-2xs p-0 font-bold',
                label: 'text-xs !text-black',
              }}
              value={cardNumber}
              size='sm'
              type='text'
              maxLength={12}
              endContent={<CreditCardIcon />}
              readOnly
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
          type='submit'
          color='primary'
          className='mx-auto mt-[30px] max-w-[320px]'
          isDisabled={!validateStep()}
          isLoading={isPending}
        >
          Confirm
        </Button>
      </div>
    </>
  );
};
