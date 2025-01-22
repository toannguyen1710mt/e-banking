// Interfaces
import { IUser, TEXT_SIZE, TEXT_VARIANT } from '@/interfaces';

// Components
import { Text } from '@/components/common';
import { ProfileForm } from './ProfileForm';

interface GeneralProps {
  user: IUser;
}

export const General = ({ user }: GeneralProps) => (
  <>
    <div className='border-b border-primary-200 border-opacity-50 pb-4 pl-8 max-[800px]:pt-6'>
      <Text
        as='h1'
        variant={TEXT_VARIANT.DEFAULT}
        size={TEXT_SIZE.BASE}
        className='font-semibold'
      >
        Edit Profile
      </Text>
      <Text
        variant={TEXT_VARIANT.INFO}
        size={TEXT_SIZE.SM}
        className='font-normal'
      >
        Manage Your General Account Information
      </Text>
    </div>

    <div className='mt-5 pl-8'>
      <ProfileForm userProfile={user} />
    </div>
  </>
);
