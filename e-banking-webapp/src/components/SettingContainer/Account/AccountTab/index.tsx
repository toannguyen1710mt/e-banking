'use client';

import { Tab, Tabs } from '@nextui-org/react';

// Constants
import { ACCOUNT_TABS } from '@/constants';

export const AccountTab = () => (
  <Tabs
    classNames={{
      tabList: 'gap-8 w-full',
      cursor: 'w-full shadow-none',
      tab: 'max-w-fit text-[13px] font-normal p-0',
      tabContent:
        'group-data-[selected=true]:text-sm group-data-[selected=true]:font-semibold group-data-[selected=true]:text-primary-200 group-data-[selected=true]:border-none',
    }}
    variant='light'
  >
    {ACCOUNT_TABS.map(({ key, title, content }) => (
      <Tab key={key} title={<span>{title}</span>}>
        <div className='pl-[105px] pt-16'>{content}</div>
      </Tab>
    ))}
  </Tabs>
);
