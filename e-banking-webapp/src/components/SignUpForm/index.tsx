'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

// Constants
import {
  SIGNUP_FORM_DEFAULT_VALUES,
  ACCOUNT_DEFAULT_VALUES,
  ERROR_MESSAGES,
} from '@/constants';
import { SignUpSchema } from '@/constants/rules';

// Context
import { WizardFormContextProvider } from '@/context';

// Actions
import { addAccount, addCard, signUp, updateUser } from '@/actions/auth';

// Utils
import { toastManager } from '@/utils';

// Interfaces
import { IAccountPayload, ICardPayload } from '@/interfaces';

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
    defaultValues: SIGNUP_FORM_DEFAULT_VALUES,
    reValidateMode: 'onBlur',
    mode: 'onBlur',
  });

  const submitHandler = async (data: FormValues) => {
    try {
      const { email, password, username } = data.user;

      const { phone, country, postal } = data.contact;

      const response = await signUp({
        email,
        password,
        username,
      });

      if (response.status === 400) {
        throw response.message;
      }

      if (response?.data?.user) {
        await updateUser(response.data.user.id, { phone, country, postal });

        const accountPayloads: IAccountPayload[] = ACCOUNT_DEFAULT_VALUES.map(
          (account) => ({
            data: {
              ...account,
              user: response.data.user.id,
            },
          }),
        );

        const responseAccounts = await Promise.all(
          accountPayloads.map((payload) => addAccount(payload)),
        );

        if (responseAccounts) {
          const payloadCard: ICardPayload = {
            data: {
              ...data.card,
              account: responseAccounts[0].data.id,
            },
          };
          await addCard(payloadCard);
        }
      }
    } catch (error) {
      toastManager.showToast(
        `${ERROR_MESSAGES.ERROR_SIGN_UP_FORM} ${error}`,
        'error',
        'top-center',
      );
    }
  };

  // Step content to register user
  const steps = [
    {
      name: 'user',
      formContent: <AccountForm />,
      textHeading: 'Control Your Finances, Join Us Today!',
      textFooter: 'Already have an account?',
      subheading: 'Fill the form below to create an account',
    },
    {
      name: 'contact',
      formContent: <ContactForm />,
      textHeading: 'Control Your Finances, Join Us Today!',
      textFooter: 'Already have an account?',
      subheading: 'Please provide your phone and contact info',
    },
    {
      name: 'card',
      formContent: (
        <CreditCardForm schema={SignUpSchema} submitHandler={submitHandler} />
      ),
      textHeading: 'Control Your Finances, Join Us Today!',
      textFooter: 'Already have an account?',
      subheading: 'Please provide your Credit Card  information',
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
      className='bottom-0 mx-auto flex h-full flex-col justify-between px-0 md:px-10'
    >
      {steps.map(
        ({ name, formContent, textHeading, textFooter, subheading }) => (
          <WizardForm.Step
            name={name}
            key={name}
            className='ml-0 md:ml-[67px] lg:ml-[32px] xl:ml-[67px]'
          >
            <AuthContentWrapper
              formContent={formContent}
              textHeading={textHeading}
              textFooter={textFooter}
              subheading={subheading}
            />
          </WizardForm.Step>
        ),
      )}

      <WizardForm.Footer>
        <WizardFormContextProvider>
          {({ currentStepIndex, onPrevStep }) => (
            <StepProgress
              onPrevStep={onPrevStep}
              steps={4}
              activeStep={currentStepIndex}
            />
          )}
        </WizardFormContextProvider>
      </WizardForm.Footer>
    </WizardForm.Root>
  );
};
