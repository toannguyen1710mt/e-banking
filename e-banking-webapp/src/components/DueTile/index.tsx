// Libs
import { ReactNode } from 'react';

// Components
import { Text } from '@/components';

interface IDueTile {
  icon: ReactNode;
  title: string;
  createAt: string;
}

export const DueTile = ({ icon, title, createAt }: IDueTile) => (
  <div className='flex gap-3'>
    <div className='h-9 w-9 rounded-md bg-dimGray p-[6px] text-navyBlue'>
      {icon}
    </div>
    <div className='flex flex-col'>
      <Text as='span' className='text-sm font-semibold text-navyBlue'>
        {title}
      </Text>
      <Text as='span' className='text-[10px] font-normal text-neutralGray'>
        {createAt}
      </Text>
    </div>
  </div>
);
