// Constants
import { PAYMENT_METHODS } from '@/constants';

// Component
import { Button, Text, AttentionIcon } from '@/components';

export const ConnectedAccount = () => (
  <div className='flex flex-col'>
    <Text as='span' className='text-sm font-semibold text-navyBlue'>
      Connected Apps &amp; Accounts
    </Text>
    <Text as='span' className='mt-[5px] text-[13px] font-normal'>
      Your connected App, socials and Accounts will appear here.
    </Text>
    <div className='mt-3 flex items-center gap-[10px]'>
      <AttentionIcon />
      <Text as='span' className='text-xs font-normal text-neutralGray'>
        We won&apos;t post anything on your socials
      </Text>
    </div>
    <div className='ml-3 mt-6 grid grid-cols-2 gap-[54px]'>
      {PAYMENT_METHODS.map(({ label, icon: Icon, buttonText }) => (
        <div key={label}>
          <Text as='label' className='text-sm font-medium'>
            {label}
          </Text>
          <Button
            color='secondary'
            startContent={<Icon />}
            variant='solid'
            radius='xs'
            className='mt-6 h-14'
          >
            {buttonText}
          </Button>
        </div>
      ))}
    </div>
  </div>
);
