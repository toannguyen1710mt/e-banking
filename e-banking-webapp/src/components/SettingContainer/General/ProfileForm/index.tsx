'use client';

import { Session } from 'next-auth';

// Interfaces
import { IUser, TEXT_SIZE, TEXT_VARIANT } from '@/interfaces';

// Actions
import { updateUser } from '@/actions';

// Context
import { useUserContext } from '@/context';

// Utils
import { toastManager } from '@/utils';

// Components
import { Input, Text } from '@/components';
import { UploadImage } from '@/components/SettingContainer/General/UploadImage';
import { ERROR_MESSAGES } from '@/constants';

interface ProfileFormProps {
  userProfile: IUser;
  session: Session;
}

export const ProfileForm = ({ userProfile, session }: ProfileFormProps) => {
  const { username, email, phone, country, avatar } = userProfile;

  const { updateSession } = useUserContext();

  const handleChangeImage = async (url: string) => {
    try {
      const { avatar } = await updateUser(userProfile.id, { avatar: url });

      updateSession(avatar);
    } catch (error) {
      toastManager.showToast(
        `${ERROR_MESSAGES.ERROR_UPDATE_AVATAR} ${error}`,
        'error',
        'top-center',
      );
    }
  };

  const handleRemoveImage = async () => {
    try {
      await updateUser(userProfile.id, { avatar: '' });

      updateSession('');
    } catch (error) {
      toastManager.showToast(
        `${ERROR_MESSAGES.ERROR_REMOVE_AVATAR} ${error}`,
        'error',
        'top-center',
      );
    }
  };

  return (
    <div className='flex flex-col pr-8 lg:pr-[87px]'>
      <div className='mb-10'>
        <Text
          variant={TEXT_VARIANT.DEFAULT}
          size={TEXT_SIZE.SM}
          className='mb-[11px]'
        >
          Profile Picture
        </Text>

        <div className='flex flex-col'>
          <UploadImage
            src={avatar}
            alt='Avatar'
            onChange={handleChangeImage}
            onRemove={handleRemoveImage}
            session={session}
          />
        </div>
      </div>

      <div className='mb-14 grid max-w-[1024px] grid-cols-2 gap-x-8 gap-y-8 max-[700px]:grid-cols-1 lg:gap-x-[108px]'>
        <Input
          label='Username'
          placeholder=' '
          labelPlacement='outside'
          classNames={{
            inputWrapper: 'px-2.5 py-2 rounded-sm border-default',
            input: 'm-0 text-sm',
          }}
          value={username}
          readOnly
        />

        <Input
          label='Phone Number'
          labelPlacement='outside'
          placeholder=' '
          classNames={{
            inputWrapper: 'px-2.5 py-2 rounded-sm border-default',
            input: 'm-0 text-sm font-normal',
          }}
          value={phone}
          readOnly
        />

        <Input
          label='Email'
          labelPlacement='outside'
          placeholder=' '
          classNames={{
            inputWrapper: 'px-2.5 py-2 rounded-sm border-default',
            input: 'm-0 text-sm',
          }}
          value={email}
          readOnly
        />

        <Input
          label='Address'
          labelPlacement='outside'
          aria-label='address'
          placeholder='Address'
          value={country}
          type='text'
          classNames={{
            inputWrapper: 'px-2.5 py-2 rounded-sm border-default',
            input: 'm-0 text-sm',
          }}
          readOnly
        />
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

      <div className='grid max-w-[1024px] grid-cols-2 gap-x-8 gap-y-8 max-[700px]:grid-cols-1 max-[700px]:pb-5 lg:gap-x-[108px]'>
        <Input
          label='Paypal'
          labelPlacement='outside'
          placeholder=' '
          classNames={{
            inputWrapper: 'px-2.5 py-2 rounded-sm border-default',
            input: 'm-0 text-sm font-normal',
          }}
          value={email}
          readOnly
        />

        <Input
          label='Google Pay'
          labelPlacement='outside'
          placeholder=' '
          classNames={{
            inputWrapper: 'px-2.5 py-2 rounded-sm border-default',
            input: 'm-0 text-sm font-normal',
          }}
          value={email}
          readOnly
        />
      </div>
    </div>
  );
};
