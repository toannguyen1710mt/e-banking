'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useDisclosure } from '@nextui-org/react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

// Constants
import { PASSWORD_DEFAULT_VALUES } from '@/constants';

// Schemas
import { UpdatePasswordSchema } from '@/schemas';

// Components
import { Button, Input, Text } from '@/components/common';
import { EyeIcon, EyeSlashIcon } from '@/components/icons';

type FormValues = z.infer<typeof UpdatePasswordSchema>;

export const PasswordTab = () => {
  const {
    control,
    formState: { isValid, isDirty },
    handleSubmit,
  } = useForm<FormValues>({
    defaultValues: PASSWORD_DEFAULT_VALUES,
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    resolver: zodResolver(UpdatePasswordSchema),
  });

  const {
    isOpen: isOpenPassword,
    onClose: closePassword,
    onOpen: openPassword,
  } = useDisclosure();

  const {
    isOpen: newPasswordIsOpen,
    onClose: closeNewPassword,
    onOpen: openNewPassword,
  } = useDisclosure();

  const {
    isOpen: confirmPasswordIsOpen,
    onClose: closeConfirmPassword,
    onOpen: openConfirmPassword,
  } = useDisclosure();

  const onSubmit = handleSubmit(async (data) => {
    // TODO: Handle update password
    console.log('data', data);
    return;
  });

  return (
    <form className='space-y-5' onSubmit={onSubmit}>
      <Text as='span' className='mb-[26px] text-sm font-semibold text-navyBlue'>
        Change Password
      </Text>

      <div className='flex w-full max-w-[680px] flex-col gap-8'>
        {/* Current Password */}
        <Controller
          control={control}
          name='user.password'
          render={({ field, fieldState: { error } }) => (
            <Input
              aria-label='current password'
              placeholder=' '
              label='Current Password'
              labelPlacement='outside'
              type={isOpenPassword ? 'text' : 'password'}
              classNames={{
                input: 'm-0 text-sm',
                label: 'font-normal text-xs !text-black opacity-100',
              }}
              endContent={
                <button
                  type='button'
                  aria-label='show password button'
                  className='text-primary-200'
                  onClick={isOpenPassword ? closePassword : openPassword}
                >
                  {isOpenPassword ? <EyeSlashIcon /> : <EyeIcon />}
                </button>
              }
              isInvalid={!!error?.message}
              errorMessage={error?.message}
              {...field}
            />
          )}
        />

        {/* New Password */}
        <Controller
          control={control}
          name='user.newPassword'
          render={({ field, fieldState: { error } }) => (
            <Input
              aria-label='password'
              label='New Password'
              labelPlacement='outside'
              placeholder=' '
              classNames={{
                input: 'm-0 text-sm',
                label: 'font-normal text-xs !text-black opacity-100',
              }}
              type={isOpenPassword ? 'text' : 'password'}
              endContent={
                <button
                  type='button'
                  aria-label='show password button'
                  className='text-primary-200'
                  onClick={
                    newPasswordIsOpen ? closeNewPassword : openNewPassword
                  }
                >
                  {isOpenPassword ? <EyeSlashIcon /> : <EyeIcon />}
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
              placeholder=' '
              label='Confirm Password'
              labelPlacement='outside'
              classNames={{
                input: 'm-0 text-sm',
                label: 'font-normal text-xs !text-black opacity-100',
              }}
              type={confirmPasswordIsOpen ? 'text' : 'password'}
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

        <Button
          color='navyBlue'
          radius='xs'
          type='submit'
          isDisabled={!isDirty || !isValid}
        >
          Change Password
        </Button>
      </div>
    </form>
  );
};
