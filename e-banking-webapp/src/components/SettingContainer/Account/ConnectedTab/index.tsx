// Constants
import { PAYMENT_METHODS } from '@/constants';

// Interfaces
import { TEXT_SIZE } from '@/interfaces';

// Component
import { Button, Text, AttentionIcon } from '@/components';

export const ConnectedTab = () => (
  <div className='flex flex-col'>
    <Text as='span' className='mb-[5px] text-sm font-semibold text-navyBlue'>
      Connected Apps &amp; Accounts
    </Text>
    <Text as='span' className='mb-3 text-[13px] font-normal'>
      Your connected App, socials and Accounts will appear here.
    </Text>

    <div className='mb-[57px] flex items-center gap-[10px]'>
      <AttentionIcon />
      <Text as='span' className='text-xs font-normal text-neutralGray'>
        We won&apos;t post anything on your socials
      </Text>
    </div>

    <div className='ml-3 grid max-w-[680px] grid-cols-2 gap-[54px]'>
      {PAYMENT_METHODS.map(({ label, icon: Icon, buttonText }) => (
        <div key={label} className='flex flex-col gap-6'>
          <Text as='label' size={TEXT_SIZE.SM}>
            {label}
          </Text>
          <Button
            color='secondary'
            startContent={<Icon />}
            variant='solid'
            radius='xs'
            size='xl'
          >
            {buttonText}
          </Button>
        </div>
      ))}
    </div>
  </div>
);
