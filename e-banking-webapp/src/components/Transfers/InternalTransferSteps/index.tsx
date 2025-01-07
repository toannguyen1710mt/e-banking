'use client';

// Libs
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Session } from 'next-auth';

// Interfaces
import { IAccountPayloadData, TransactionCreateData } from '@/interfaces';

// Components
import * as WizardForm from '@/components/common/WizardForm';
import {
  InternalTransferForm,
  ConfirmInternalTransfer,
  InternalTransferSuccess,
} from '@/components';

// Schemas
import { InternalTransferFormSchema } from '@/schemas';

// Actions
import { createTransaction, updateAccountInfo } from '@/actions';

import { FetchedBalancesProvider } from '@/context/FetchedBalancesContext';

type FormValues = z.infer<typeof InternalTransferFormSchema>;

interface IInternalTransferStepsProps {
  session: Session;
  onClose: () => void;
}

export const InternalTransferSteps = ({
  session,
  onClose,
}: IInternalTransferStepsProps) => {
  const form = useForm<FormValues>({
    mode: 'onBlur',
    defaultValues: {
      internalTransfer: {
        fromAccountType: undefined,
        toAccountType: undefined,
        amount: '',
      },
    },
    resolver: zodResolver(InternalTransferFormSchema),
  });

  const submitHandler = async (data: FormValues) => {
    const {
      internalTransfer: { fromAccountType, toAccountType, amount },
      fromAccountId,
      toAccountId,
      fromAccountNumber,
      toAccountNumber,
      fromAccountBalance,
      toAccountBalance,
      fromCardName,
      toCardName,
    } = data;

    try {
      const transactionData: TransactionCreateData = {
        fromAccountId,
        toAccountId,
        fromAccountType,
        toAccountType,
        statusTransaction: true,
        amount: Number(amount),
      };

      const accountSendData: IAccountPayloadData = {
        name: fromCardName,
        accountNumber: fromAccountNumber,
        balance: fromAccountBalance - Number(amount),
        type: fromAccountType,
        currency: '$',
      };

      const accountReceiveData: IAccountPayloadData = {
        name: toCardName,
        accountNumber: toAccountNumber,
        balance: toAccountBalance + Number(amount),
        type: toAccountType,
        currency: '$',
      };

      await createTransaction(transactionData);
      await updateAccountInfo(fromAccountId, accountSendData);
      await updateAccountInfo(toAccountId, accountReceiveData);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      // TODO: Handle show error message in toast
    }
  };

  return (
    <FetchedBalancesProvider>
      <WizardForm.Root
        schema={InternalTransferFormSchema}
        form={form}
        className='flex grow flex-col'
      >
        <WizardForm.Step name='internalTransfer' key='internalTransfer'>
          <InternalTransferForm session={session} />
        </WizardForm.Step>

        <WizardForm.Step
          name='confirm'
          key='confirm'
          className='flex grow flex-col items-center justify-center'
        >
          <ConfirmInternalTransfer submitHandler={submitHandler} />
        </WizardForm.Step>

        <WizardForm.Step
          name='success'
          key='success'
          className='flex grow flex-col items-center justify-center'
        >
          <InternalTransferSuccess onClose={onClose} />
        </WizardForm.Step>
      </WizardForm.Root>
    </FetchedBalancesProvider>
  );
};
