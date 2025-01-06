'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useDisclosure } from '@nextui-org/react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { Session } from 'next-auth';
import { useTransition } from 'react';

// Interfaces
import { TChangePasswordFormData } from '@/interfaces';

// Constants
import { ERROR_MESSAGES, PASSWORD_DEFAULT_VALUES } from '@/constants';

// Schemas
import { UpdatePasswordSchema } from '@/schemas';

// Components
import { Button, Input, Text } from '@/components/common';
import { EyeIcon, EyeSlashIcon } from '@/components/icons';

// Actions
import { changePassword } from '@/actions';

// Context
import { useToastContext } from '@/context';

type FormValues = z.infer<typeof UpdatePasswordSchema>;

interface IPasswordTabProps {
  session: Session;
}

export const PasswordTab = ({ session }: IPasswordTabProps) => {
  const {
    control,
    formState: { isValid, isDirty },
    setError,
    handleSubmit,
    reset,
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
    isOpen: isOpenNewPassword,
    onClose: closeNewPassword,
    onOpen: openNewPassword,
  } = useDisclosure();

  const {
    isOpen: isOpenConfirmPassword,
    onClose: closeConfirmPassword,
    onOpen: openConfirmPassword,
  } = useDisclosure();

  const [isChangingPassword, startTransition] = useTransition();

  const isButtonDisabled = !isDirty || !isValid || isChangingPassword;

  const { showToast } = useToastContext();

  const onSubmit = handleSubmit((data) => {
    const { currentPassword, newPassword, confirmPassword } = data;

    const changePasswordFormData: TChangePasswordFormData = {
      currentPassword,
      password: newPassword,
      passwordConfirmation: confirmPassword,
    };

    startTransition(async () => {
      try {
        const response = await changePassword(
          changePasswordFormData,
          session.user.token,
        );

        if (response.status === 400) {
          throw response.message;
        }

        showToast(
          ERROR_MESSAGES.CHANGE_PASSWORD_SUCCESS,
          'success',
          'top-center',
        );

        reset();
      } catch (error) {
        if (String(error) === ERROR_MESSAGES.INVALID_CURRENT_PASSWORD) {
          setError('currentPassword', {
            message: ERROR_MESSAGES.INVALID_CURRENT_PASSWORD,
          });
        }

        if (String(error) === ERROR_MESSAGES.NEW_PASSWORD_SAME_AS_OLD) {
          setError('newPassword', {
            message: ERROR_MESSAGES.NEW_PASSWORD_SAME_AS_OLD,
          });
        }

        showToast(ERROR_MESSAGES.CHANGE_PASSWORD_FAILED, 'error', 'top-center');
      }
    });
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
          name='currentPassword'
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
          name='newPassword'
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
              type={isOpenNewPassword ? 'text' : 'password'}
              endContent={
                <button
                  type='button'
                  aria-label='show password button'
                  className='text-primary-200'
                  onClick={
                    isOpenNewPassword ? closeNewPassword : openNewPassword
                  }
                >
                  {isOpenNewPassword ? <EyeSlashIcon /> : <EyeIcon />}
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
              type={isOpenConfirmPassword ? 'text' : 'password'}
              endContent={
                <button
                  type='button'
                  aria-label='show password button'
                  className='text-primary-200'
                  onClick={
                    isOpenConfirmPassword
                      ? closeConfirmPassword
                      : openConfirmPassword
                  }
                >
                  {isOpenConfirmPassword ? <EyeSlashIcon /> : <EyeIcon />}
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
          isDisabled={isButtonDisabled}
          isLoading={isChangingPassword}
        >
          Change Password
        </Button>
      </div>
    </form>
  );
};
