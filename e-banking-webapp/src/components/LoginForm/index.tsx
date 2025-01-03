'use client';

import { useState } from 'react';
import { useDisclosure } from '@nextui-org/react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

// Constants
import { ROUTES } from '@/constants';
import { signInSchema } from '@/constants/rules';

// Interfaces
import { TEXT_SIZE, TEXT_VARIANT, TSignInFormData } from '@/interfaces';

// Actions
import { authenticateUser } from '@/actions/auth';

// Components
import { EyeIcon, EyeSlashIcon, LockIcon, UserIcon } from '@/components/icons';
import { Button, Input, Text } from '@/components';

export const LoginForm = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { isDirty, isValid, isSubmitting },
  } = useForm<TSignInFormData>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      identifier: '',
      password: '',
    },
    mode: 'onBlur',
  });

  const {
    isOpen: passwordIsOpen,
    onClose: closePassword,
    onOpen: openPassword,
  } = useDisclosure();

  const onSubmit = handleSubmit(async (data) => {
    const errorMessage = await authenticateUser(data);

    if (errorMessage) {
      setErrorMessage(errorMessage);
      return;
    }

    router.push(ROUTES.HOME);
    return;
  });

  return (
    <form onSubmit={onSubmit} className='mr-0 md:mr-[83px]'>
      <div className='mb-8 flex w-full flex-col gap-6 bg-white md:gap-4'>
        <Text
          variant={TEXT_VARIANT.INFO}
          className='font-normal leading-[22px]'
        >
          Sign in to your account to continue
        </Text>

        {/* Sign-in with username or email */}
        <Controller
          control={control}
          name='identifier'
          render={({ field, fieldState: { error } }) => (
            <Input
              {...field}
              onChange={(e) => {
                field.onChange(e);
                setErrorMessage(null);
              }}
              aria-label='identifier'
              placeholder='Username or Email address'
              isInvalid={!!error?.message}
              errorMessage={error?.message}
              startContent={<UserIcon />}
            />
          )}
        />

        <Controller
          control={control}
          name='password'
          render={({ field, fieldState: { error } }) => (
            <Input
              {...field}
              onChange={(e) => {
                field.onChange(e);
                setErrorMessage(null);
              }}
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
            />
          )}
        />

        {errorMessage && (
          <Text size={TEXT_SIZE.SM} className='text-warning'>
            {errorMessage}
          </Text>
        )}
        <Link
          href='#'
          aria-disabled
          className='text-right text-sm leading-[20px]'
        >
          Forgot Password?
        </Link>
      </div>

      {/* Display error message below the form */}
      <Button
        type='submit'
        color='primary'
        isDisabled={!isDirty || !isValid}
        isLoading={isSubmitting}
      >
        Sign In
      </Button>
    </form>
  );
};
