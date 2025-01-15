// Libs
import { Session } from 'next-auth';

// Interfaces
import { TEXT_SIZE, TEXT_VARIANT } from '@/interfaces';

// Components
import { Text } from '@/components/common';
import { AccountTabs } from './AccountTabs';

interface IAccountProps {
  session: Session;
}

export const Account = async ({ session }: IAccountProps) => (
  <>
    <div className='border-b border-primary-200 border-opacity-50 pb-4 pl-8 max-[800px]:pt-6'>
      <Text
        as='h4'
        variant={TEXT_VARIANT.DEFAULT}
        size={TEXT_SIZE.BASE}
        className='font-semibold'
      >
        Account Setting
      </Text>
      <Text
        variant={TEXT_VARIANT.INFO}
        size={TEXT_SIZE.SM}
        className='font-normal'
      >
        Manage Your Account Settings
      </Text>
    </div>

    <div className='mt-5 pl-8'>
      <AccountTabs session={session} />
    </div>
  </>
);
