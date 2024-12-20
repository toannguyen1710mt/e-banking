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
      fromAccountType: undefined,
      toAccountType: undefined,
      amount: 0,
    },
    resolver: zodResolver(InternalTransferFormSchema),
  });

  const allFieldValues = form.watch();

  const submitHandler = async (data: FormValues) => {
    try {
      const transactionData: TransactionCreateData = {
        fromAccountId: data.fromAccountId,
        toAccountId: data.toAccountId,
        fromAccountType: data.fromAccountType,
        toAccountType: data.toAccountType,
        statusTransaction: true,
        amount: Number(data.amount),
      };

      const accountSendData: IAccountPayloadData = {
        name: data.fromCardName,
        accountNumber: data.fromAccountNumber,
        balance: data.fromAccountBalance - Number(data.amount),
        type: data.fromAccountType,
        currency: '$',
      };

      const accountReceiveData: IAccountPayloadData = {
        name: data.toCardName,
        accountNumber: data.toAccountNumber,
        balance: data.toAccountBalance + Number(data.amount),
        type: data.toAccountType,
        currency: '$',
      };

      await createTransaction(transactionData);
      await updateAccountInfo(data.fromAccountId, accountSendData);
      await updateAccountInfo(data.toAccountId, accountReceiveData);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      // TODO: Handle show error message in toast
    }
  };

  return (
    <WizardForm.Root
      schema={InternalTransferFormSchema}
      form={form}
      className='flex grow flex-col'
    >
      <WizardForm.Step name='transfer' key='transfer'>
        <InternalTransferForm session={session} />
      </WizardForm.Step>

      <WizardForm.Step
        name='confirm'
        key='confirm'
        className='flex grow flex-col items-center justify-center'
      >
        <ConfirmInternalTransfer
          {...allFieldValues}
          submitHandler={submitHandler}
        />
      </WizardForm.Step>

      <WizardForm.Step
        name='success'
        key='success'
        className='flex grow flex-col items-center justify-center'
      >
        <InternalTransferSuccess {...allFieldValues} onClose={onClose} />
      </WizardForm.Step>
    </WizardForm.Root>
  );
};
