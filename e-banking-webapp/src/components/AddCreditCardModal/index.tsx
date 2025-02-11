'use client';

import { useEffect, useState, useTransition } from 'react';
import Image from 'next/image';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { AuthError, Session } from 'next-auth';

// Constants
import { ERROR_MESSAGES, IMAGES } from '@/constants';

// Interfaces
import { IAccount } from '@/interfaces';

// Actions
import { addNewCardByAccountId } from '@/actions';

// Schemas
import { CreditCardSchema } from '@/schemas';

// Services
import { getAccountsByUserId } from '@/services';

// Components
import * as WizardForm from '@/components/common/WizardForm';
import { Modal } from '../common';
import { AddCreditCard } from './AddCreditCard';
import { ConfirmAddCard } from './ConfirmAddCard';
import { toastStore } from '@/utils';

interface IAddCreditCardModalProps {
  session: Session;
  isOpen: boolean;
  onClose: () => void;
}

type FormValues = z.infer<typeof CreditCardSchema>;

export const AddCreditCardModal = ({
  isOpen,
  session,
  onClose,
}: IAddCreditCardModalProps) => {
  const [accounts, setAccounts] = useState<IAccount[]>([]);
  const [isPending, startTransition] = useTransition();

  const form = useForm<FormValues>({
    resolver: zodResolver(CreditCardSchema),
    defaultValues: {
      cardInfo: {
        holderName: '',
        cardNumber: '',
        expireAt: '',
        ccv: '',
      },
      walletType: 'Main',
    },
    reValidateMode: 'onBlur',
    mode: 'onBlur',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getAccountsByUserId(session.user.id);

        setAccounts(result || []);
      } catch (error) {
        if (error instanceof AuthError) {
          throw ERROR_MESSAGES.GET_ERROR;
        }
      }
    };

    fetchData();
  }, [session.user.id]);

  const onSubmit = async (data: FormValues) => {
    const { holderName, cardNumber, expireAt, ccv } = data.cardInfo;

    const selectedAccount = accounts.find(
      (account) => account.type === data?.walletType,
    );

    try {
      await addNewCardByAccountId(selectedAccount?.documentId as string, {
        holderName,
        cardNumber,
        expireAt,
        ccv,
      });

      startTransition(() => {
        toastStore.showToast(
          ERROR_MESSAGES.ADD_CARD_SUCCESS,
          'success',
          'top-center',
        );

        return onClose();
      });
    } catch (error) {
      toastStore.showToast(
        ERROR_MESSAGES.ADD_CARD_FAILED,
        'error',
        'top-center',
      );

      if (error instanceof AuthError) {
        throw ERROR_MESSAGES.ADD_CARD_FAILED;
      }
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size='4xl'
      placement='center'
      classNames={{
        base: 'p-0 rounded-xl bg-primary-200',
      }}
    >
      <div className='flex items-center justify-between'>
        <Image
          className='max-w-[50%] flex-1 px-[31px] py-[87px]'
          src={IMAGES.ADD_CREDIT_CARD_IMAGE}
          width={333}
          height={280}
          alt='Add Credit Card'
        />

        <div className='min-h-[500px] flex-1 rounded-xl bg-white px-4 py-8'>
          <WizardForm.Root
            schema={CreditCardSchema}
            form={form}
            className='flex grow flex-col'
            onSubmit={onSubmit}
          >
            <WizardForm.Step name='cardInfo' key='cardInfo'>
              <AddCreditCard />
            </WizardForm.Step>

            <WizardForm.Step
              name='confirmationDetails'
              key='confirmationDetails'
            >
              <ConfirmAddCard accounts={accounts} isPending={isPending} />
            </WizardForm.Step>
          </WizardForm.Root>
        </div>
      </div>
    </Modal>
  );
};
