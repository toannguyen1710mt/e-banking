'use client';

import { useDisclosure } from '@nextui-org/react';
import { Controller } from 'react-hook-form';

// Constants
import { SignUpSchema } from '@/constants/rules';

// Interfaces
import { TEXT_SIZE, TEXT_VARIANT } from '@/interfaces';

// Context
import { useWizardFormContext } from '@/context';

// Components
import {
  EmailIcon,
  EyeIcon,
  EyeSlashIcon,
  LockIcon,
  UserIcon,
} from '@/components/icons';
import { Button, Input, Text } from '@/components';

export const AccountForm = () => {
  const {
    form: {
      control,
      formState: { errors },
    },
    onNextStep,
    validateStep,
  } = useWizardFormContext<typeof SignUpSchema>();

  const {
    isOpen: passwordIsOpen,
    onClose: closePassword,
    onOpen: openPassword,
  } = useDisclosure();
  const {
    isOpen: confirmPasswordIsOpen,
    onClose: closeConfirmPassword,
    onOpen: openConfirmPassword,
  } = useDisclosure();

  return (
    <>
      <div className='mb-10 flex w-full flex-col gap-4 bg-white'>
        <Text
          size={TEXT_SIZE.SM}
          variant={TEXT_VARIANT.INFO}
          className='font-normal'
        >
          Fill the form below to create an account
        </Text>

        {/* Sign-in with email */}
        <Controller
          control={control}
          name='user.username'
          render={({ field, fieldState: { error } }) => (
            <Input
              aria-label='username'
              placeholder='Username'
              isInvalid={
                !!error?.message || errors.user?.email?.type === 'validate'
              }
              errorMessage={error?.message}
              startContent={<UserIcon />}
              {...field}
            />
          )}
        />

        <Controller
          control={control}
          name='user.email'
          render={({ field, fieldState: { error } }) => (
            <Input
              aria-label='email'
              placeholder='Email'
              isInvalid={!!error?.message}
              errorMessage={error?.message}
              startContent={<EmailIcon />}
              {...field}
            />
          )}
        />

        <Controller
          control={control}
          name='user.password'
          render={({ field, fieldState: { error } }) => (
            <Input
              aria-label='password'
              placeholder='Password'
              className='dark:text-foreground-200'
              startContent={<LockIcon />}
              type={passwordIsOpen ? 'text' : 'password'}
              endContent={
                <button
                  type='button'
                  aria-label='show password button'
                  className='text-primary-200'
                  onClick={passwordIsOpen ? closePassword : openPassword}
                >
                  {passwordIsOpen ? <EyeSlashIcon /> : <EyeIcon />}
                </button>
              }
              isInvalid={!!error?.message}
              errorMessage={error?.message}
              {...field}
            />
          )}
        />

        <Controller
          control={control}
          name='user.confirmPassword'
          render={({ field, fieldState: { error } }) => (
            <Input
              aria-label='password'
              placeholder='Confirm Password'
              type={confirmPasswordIsOpen ? 'text' : 'password'}
              startContent={<LockIcon />}
              endContent={
                <button
                  type='button'
                  aria-label='show password button'
                  className='text-primary-200'
                  onClick={
                    confirmPasswordIsOpen
                      ? closeConfirmPassword
                      : openConfirmPassword
                  }
                >
                  {confirmPasswordIsOpen ? <EyeSlashIcon /> : <EyeIcon />}
                </button>
              }
              isInvalid={!!error?.message}
              errorMessage={error?.message}
              {...field}
            />
          )}
        />
      </div>

      <Button
        isDisabled={!validateStep()}
        onClick={onNextStep}
        type='button'
        color='primary'
      >
        Register
      </Button>
    </>
  );
};
