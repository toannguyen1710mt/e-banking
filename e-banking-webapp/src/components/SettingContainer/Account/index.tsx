// Interfaces
import { TEXT_SIZE, TEXT_VARIANT } from '@/interfaces';

// Components
import { Text } from '@/components/common';
import { AccountTabs } from './AccountTabs';

export const Account = () => (
  <>
    <div className='border-b border-primary-200 border-opacity-50 pb-4 pl-8'>
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
      <AccountTabs />
    </div>
  </>
);
