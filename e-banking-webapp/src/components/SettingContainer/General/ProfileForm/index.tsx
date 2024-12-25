'use client';

import { Controller, useForm } from 'react-hook-form';
import { useDisclosure } from '@nextui-org/react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

// Schemas
import { ProfileSchema } from '@/schemas';

// Interfaces
import { TEXT_SIZE, TEXT_VARIANT } from '@/interfaces';

// Components
import { Input, EyeIcon, EyeSlashIcon, Text } from '@/components';
import { UploadImage } from '../UploadImage';

type FormValues = z.infer<typeof ProfileSchema> & {
  avatar: string;
};

export const ProfileForm = () => {
  const { control, setValue } = useForm<FormValues>({
    resolver: zodResolver(ProfileSchema),
    defaultValues: {
      user: {
        username: 'Pheroxios Yehudi',
        email: 'pheroxios@yehudi.com',
        fullName: 'Pheroxios Yehudi',
        password: '1234@Abc',
      },
      avatar: '',
    },
    mode: 'all',
  });

  const {
    isOpen: passwordIsOpen,
    onClose: closePassword,
    onOpen: openPassword,
  } = useDisclosure();

  return (
    <form className='flex flex-col pr-[87px]'>
      <div className='mb-10'>
        <Text
          variant={TEXT_VARIANT.DEFAULT}
          size={TEXT_SIZE.SM}
          className='mb-[11px]'
        >
          Profile Picture
        </Text>

        <Controller
          control={control}
          name='avatar'
          render={({ field: { value, name }, fieldState: { error } }) => {
            const handleChangeImage = (url: string) => {
              setValue(`avatar`, url);
            };

            const handleRemoveImage = () => {
              setValue('avatar', '');
            };
            return (
              <div className='flex flex-col'>
                <UploadImage
                  src={value}
                  alt='Avatar'
                  name={name}
                  onChange={handleChangeImage}
                  onRemove={handleRemoveImage}
                />
                {!!error?.message && (
                  <p className='text-red-500 mt-2 text-xs'>{error.message}</p>
                )}
              </div>
            );
          }}
        />
      </div>

      <div className='mb-14 flex flex-col gap-8'>
        <div className='flex gap-[107px]'>
          <Controller
            control={control}
            name='user.username'
            render={({
              field: { onChange, onBlur, value },
              fieldState: { error },
            }) => (
              <Input
                label='Username'
                placeholder=' '
                labelPlacement='outside'
                isInvalid={!!error?.message}
                errorMessage={error?.message}
                classNames={{
                  inputWrapper: 'px-2.5 py-2 rounded-sm border-default',
                  input: 'm-0 text-sm',
                }}
                value={String(value)}
                onChange={onChange}
                onBlur={onBlur}
              />
            )}
          />

          <Controller
            control={control}
            name='user.fullName'
            render={({
              field: { onChange, onBlur, value },
              fieldState: { error },
            }) => (
              <Input
                label='Full Name'
                labelPlacement='outside'
                placeholder=' '
                isInvalid={!!error?.message}
                errorMessage={error?.message}
                classNames={{
                  inputWrapper: 'px-2.5 py-2 rounded-sm border-default',
                  input: 'm-0 text-sm font-normal',
                }}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
              />
            )}
          />
        </div>

        <div className='flex gap-[107px]'>
          <Controller
            control={control}
            name='user.email'
            render={({
              field: { onChange, onBlur, value },
              fieldState: { error },
            }) => (
              <Input
                label='Email Address'
                labelPlacement='outside'
                placeholder=' '
                isInvalid={!!error?.message}
                errorMessage={error?.message}
                classNames={{
                  inputWrapper: 'px-2.5 py-2 rounded-sm border-default',
                  input: 'm-0 text-sm',
                }}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
              />
            )}
          />

          <Controller
            control={control}
            name='user.password'
            render={({ field: { value } }) => (
              <Input
                label='Password'
                labelPlacement='outside'
                aria-label='password'
                placeholder='Password'
                value={value}
                type={passwordIsOpen ? 'text' : 'password'}
                classNames={{
                  inputWrapper: 'px-2.5 py-2 rounded-sm border-default',
                  input: 'm-0 text-sm',
                }}
                readOnly
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
              />
            )}
          />
        </div>
      </div>

      <div className='mb-5 flex flex-col gap-2.5'>
        <Text variant={TEXT_VARIANT.DEFAULT} size={TEXT_SIZE.SM}>
          Socials
        </Text>

        <Text
          variant={TEXT_VARIANT.INFO}
          size={TEXT_SIZE.XS}
          className='font-normal'
        >
          Note: This username or email will be public
        </Text>
      </div>

      <div className='flex gap-[108px]'>
        <Controller
          control={control}
          name='user.email'
          render={({
            field: { onChange, onBlur, value },
            fieldState: { error },
          }) => (
            <Input
              label='Paypal'
              labelPlacement='outside'
              placeholder=' '
              isInvalid={!!error?.message}
              errorMessage={error?.message}
              classNames={{
                inputWrapper: 'px-2.5 py-2 rounded-sm border-default',
                input: 'm-0 text-sm font-normal',
              }}
              value={value}
              onChange={onChange}
              onBlur={onBlur}
            />
          )}
        />

        <Controller
          control={control}
          name='user.email'
          render={({
            field: { onChange, onBlur, value },
            fieldState: { error },
          }) => (
            <Input
              label='Google Pay'
              labelPlacement='outside'
              placeholder=' '
              isInvalid={!!error?.message}
              errorMessage={error?.message}
              classNames={{
                inputWrapper: 'px-2.5 py-2 rounded-sm border-default',
                input: 'm-0 text-sm font-normal',
              }}
              value={value}
              onChange={onChange}
              onBlur={onBlur}
            />
          )}
        />
      </div>
    </form>
  );
};
