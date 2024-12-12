'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

// Constants
import { SignUpSchema } from '@/constants';

// Context
import { WizardFormContextProvider } from '@/context';

// Components
import * as WizardForm from '@/components/common/WizardForm';
import { ContactForm } from '@/components/SignUpForm/ContactForm';
import { CreditCardForm } from '@/components/SignUpForm/CreditCardForm';
import { AccountForm } from '@/components/SignUpForm/AccountForm';
import { SuccessNotify } from '@/components/SignUpForm/SuccessNotify';
import { AuthContentWrapper, StepProgress } from '@/components';

type FormValues = z.infer<typeof SignUpSchema>;

export const SignUpForm = () => {
  const form = useForm<FormValues>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      user: {
        username: 'ngan',
        email: 'ngan@gmail.com',
        password: '1234@Abc',
        confirmPassword: '1234@Abc',
        phone: '123456789123',
        country: 'UK',
        postalAddress: '344',
      },
      card: {
        holdersName: 'ngan',
        cardNumber: '123456789044',
        expireAt: '',
        ccv: '444',
      },
    },
    reValidateMode: 'onBlur',
    mode: 'onBlur',
  });

  //  TODO: add submit handler
  const submitHandler = (data: FormValues) => {
    console.log('Form submitted:', data);
  };

  // Step content to register user
  const steps = [
    {
      name: 'account',
      formContent: <AccountForm />,
      textHeading: 'Control Your Finances, Join Us Today!',
      textFooter: 'Already have an account?',
    },
    {
      name: 'contact',
      formContent: <ContactForm />,
      textHeading: 'Control Your Finances, Join Us Today!',
      textFooter: 'Already have an account?',
    },
    {
      name: 'card',
      formContent: (
        <CreditCardForm schema={SignUpSchema} submitHandler={submitHandler} />
      ),
      textHeading: 'Control Your Finances, Join Us Today!',
      textFooter: 'Already have an account?',
    },
    {
      name: 'success',
      formContent: <SuccessNotify />,
      textHeading: 'Your Account Has Been Successfully Created',
    },
  ];

  return (
    <WizardForm.Root
      schema={SignUpSchema}
      form={form}
      className='relative bottom-0 h-full'
    >
      {steps.map(({ name, formContent, textHeading, textFooter }) => (
        <WizardForm.Step name={name} key={name}>
          <AuthContentWrapper
            formContent={formContent}
            textHeading={textHeading}
            textFooter={textFooter}
          />
        </WizardForm.Step>
      ))}

      <WizardForm.Footer>
        <WizardFormContextProvider>
          {({ currentStepIndex }) => (
            <StepProgress steps={4} activeStep={currentStepIndex} />
          )}
        </WizardFormContextProvider>
      </WizardForm.Footer>
    </WizardForm.Root>
  );
};
