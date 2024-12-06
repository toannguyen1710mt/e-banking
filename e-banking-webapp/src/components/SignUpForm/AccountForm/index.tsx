'use client';

import { useDisclosure } from '@nextui-org/react';
import { Controller, useForm } from 'react-hook-form';

// Constants
import { EMAIL_RULES, PASSWORD_RULES, ERROR_MESSAGES } from '@/constants';

// Interfaces
import { TEXT_SIZE, TEXT_VARIANT, TSignUpFormData } from '@/interfaces';

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
    control,
    handleSubmit,
    watch,
    formState: { isDirty },
  } = useForm<TSignUpFormData>({
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
      username: '',
    },
    mode: 'onBlur',
  });

  // Watch password to compare with confirmPassword
  const password = watch('password');

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

  const onSubmit = handleSubmit(async (data) => {
    // TODO: handle form submission
    console.log('data', data);
  });

  return (
    <form onSubmit={onSubmit}>
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
          name='username'
          render={({ field, fieldState: { error } }) => (
            <Input
              aria-label='username'
              placeholder='Username'
              isInvalid={!!error?.message}
              errorMessage={error?.message}
              startContent={<UserIcon />}
              {...field}
            />
          )}
        />

        <Controller
          control={control}
          name='email'
          rules={EMAIL_RULES}
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
          name='password'
          rules={PASSWORD_RULES}
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
          name='confirmPassword'
          rules={{
            validate: (value) =>
              value === password || ERROR_MESSAGES.PASSWORD_DOES_NOT_MATCH,
          }}
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

      <Button isDisabled={!isDirty} type='submit' color='primary'>
        Register
      </Button>
    </form>
  );
};
