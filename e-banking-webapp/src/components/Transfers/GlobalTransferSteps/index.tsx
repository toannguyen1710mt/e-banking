'use client';

// Libs
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Session } from 'next-auth';

// Components
import * as WizardForm from '@/components/common/WizardForm';
import {
  GlobalTransferForm,
  ConfirmGlobalTransfer,
  GlobalTransferSuccess,
} from '@/components';

// Schemas
import { GlobalTransferFormSchema } from '@/schemas';

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
      amount: 0,
    },
    resolver: zodResolver(GlobalTransferFormSchema),
  });

  const allFieldValues = form.watch();

  const submitHandler = async (data: FormValues) => {
    console.log('Data: ', data);
  };

  return (
    <WizardForm.Root schema={GlobalTransferFormSchema} form={form}>
      <WizardForm.Step name='transfer' key='transfer'>
        <GlobalTransferForm session={session} />
      </WizardForm.Step>
      <WizardForm.Step name='confirm' key='confirm'>
        <ConfirmGlobalTransfer
          {...allFieldValues}
          submitHandler={submitHandler}
          amountInUSD={'1,000'}
        />
      </WizardForm.Step>
      <WizardForm.Step>
        <GlobalTransferSuccess
          {...allFieldValues}
          onClose={onClose}
          userName='mock'
        />
      </WizardForm.Step>
    </WizardForm.Root>
  );
};
