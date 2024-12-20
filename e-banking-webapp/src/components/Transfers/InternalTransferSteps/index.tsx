'use client';

// Libs
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Session } from 'next-auth';

// Components
import * as WizardForm from '@/components/common/WizardForm';
import {
  InternalTransferForm,
  ConfirmInternalTransfer,
  InternalTransferSuccess,
} from '@/components';

// Schemas
import { InternalTransferFormSchema } from '@/schemas';

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

  const submitHandler = (data: FormValues) => {
    // TODO: Integrate API for internal transfer
    console.log(data);
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
