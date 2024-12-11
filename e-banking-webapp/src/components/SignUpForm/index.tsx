'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

// Constants
import { SignUpSchema } from '@/constants';

// Components
import * as WizardForm from '@/components/common/WizardForm';
import { ContactForm } from '@/components/SignUpForm/ContactForm';
import { CreditCardForm } from '@/components/SignUpForm/CreditCardForm';
import { AccountForm } from '@/components/SignUpForm/AccountForm';

type FormValues = z.infer<typeof SignUpSchema>;

export const SignUpForm = () => {
  const form = useForm<FormValues>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      account: {
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
      },
      contact: {
        phone: '',
        country: 'UK',
        postalAddress: '344',
      },
      card: {
        holdersName: '',
        cardNumber: '',
        expireAt: '',
        ccv: '',
      },
    },
    reValidateMode: 'onBlur',
    mode: 'onBlur',
  });

  const onSubmit = (data: FormValues) => {
    console.log('Form submitted:', data);
  };

  return (
    <WizardForm.Root schema={SignUpSchema} form={form} onSubmit={onSubmit}>
      <WizardForm.Step name='account'>
        <AccountForm />
      </WizardForm.Step>

      <WizardForm.Step name='contact'>
        <ContactForm />
      </WizardForm.Step>

      <WizardForm.Step name='card'>
        <CreditCardForm />
      </WizardForm.Step>

      {/* TODO: add slider */}
      {/* <WizardForm.Footer>
        <WizardForm.WizardFormContextProvider>
          {({ currentStepIndex }) => <span>{currentStepIndex}</span>}
        </WizardForm.WizardFormContextProvider>
      </WizardForm.Footer> */}
    </WizardForm.Root>
  );
};
