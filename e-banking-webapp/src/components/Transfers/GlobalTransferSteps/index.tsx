'use client';

// Libs
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Session } from 'next-auth';

// Constants
import { ERROR_MESSAGES } from '@/constants';

// Models
import { IAccountPayloadData, TransactionCreateData } from '@/interfaces';

// API
import { createTransaction, updateAccountInfo } from '@/actions';

// Helpers / Utils
import { GlobalTransferFormSchema } from '@/schemas';
import { convertToUSD, formatNumberWithCommas, sanitizeAmount } from '@/utils';

// Components
import * as WizardForm from '@/components/common/WizardForm';
import {
  GlobalTransferForm,
  ConfirmGlobalTransfer,
  GlobalTransferSuccess,
} from '@/components';
import { FetchedBalancesProvider } from '@/context';

// Contexts
import { useToastContext } from '@/context';

type FormValues = z.infer<typeof GlobalTransferFormSchema>;

interface IGlobalTransferSteps {
  session: Session;
  onClose?: () => void;
}

export const GlobalTransferSteps = ({
  session,
  onClose,
}: IGlobalTransferSteps) => {
  const form = useForm<FormValues>({
    mode: 'onBlur',
    defaultValues: {
      fromAccountType: undefined,
      fromCountryType: undefined,
      amount: '',
    },
    resolver: zodResolver(GlobalTransferFormSchema),
  });

  const allFieldValues = form.watch();

  const amountInUSD = formatNumberWithCommas(
    convertToUSD(allFieldValues.fromCountryType, Number(allFieldValues.amount)),
  );

  const { showToast } = useToastContext();

  const sanitizedAmountInUSD = sanitizeAmount(amountInUSD);

  const submitHandler = async ({
    fromAccountId,
    fromCardName,
    fromAccountNumber,
    fromAccountBalance,
    fromAccountType,
    amount,
  }: FormValues) => {
    const transactionData: TransactionCreateData = {
      fromAccountId,
      toAccountId: allFieldValues.recipientAccount,
      fromAccountType,
      toAccountType: undefined,
      statusTransaction: true,
      amount: sanitizeAmount(
        formatNumberWithCommas(
          convertToUSD(allFieldValues.fromCountryType, Number(amount)),
        ),
      ),
      recipientName: allFieldValues.recipientName,
    };

    const payload: IAccountPayloadData = {
      name: fromCardName,
      accountNumber: fromAccountNumber,
      balance: fromAccountBalance - sanitizedAmountInUSD,
      type: fromAccountType,
      currency: '$',
    };

    try {
      await createTransaction(fromAccountId, transactionData);
      await updateAccountInfo(fromAccountId, payload);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      showToast(ERROR_MESSAGES.TRANSFER_FAILED);
    }
  };

  return (
    <FetchedBalancesProvider>
      <WizardForm.Root
        schema={GlobalTransferFormSchema}
        form={form}
        className='flex grow flex-col'
      >
        <WizardForm.Step name='transfer' key='transfer'>
          <GlobalTransferForm session={session} />
        </WizardForm.Step>
        <WizardForm.Step
          name='confirm'
          key='confirm'
          className='flex grow flex-col items-center justify-center'
        >
          <ConfirmGlobalTransfer
            {...allFieldValues}
            submitHandler={submitHandler}
            amountInUSD={amountInUSD}
          />
        </WizardForm.Step>
        <WizardForm.Step
          name='success'
          key='success'
          className='flex grow flex-col items-center justify-center'
        >
          <GlobalTransferSuccess {...allFieldValues} onClose={onClose} />
        </WizardForm.Step>
      </WizardForm.Root>
    </FetchedBalancesProvider>
  );
};
