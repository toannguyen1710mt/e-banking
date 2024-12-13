'use client';

// Libs
import { cn, Tab, Tabs, TabsProps } from '@nextui-org/react';
import { ReactNode } from 'react';

interface ITransferTag extends TabsProps {
  tabs: {
    keyTab: string;
    title: string;
    description: string;
    icon: ReactNode;
    content: ReactNode;
  }[];
}

export const TransferTag = ({ tabs, classNames }: ITransferTag) => {
  return (
    <div className='flex h-full flex-col px-4'>
      <div className='flex h-full w-full flex-col'>
        <Tabs
          aria-label='Options'
          placement='start'
          classNames={{
            panel: cn('pl-[61px]', classNames?.panel),
            tab: cn('justify-start bg-white', classNames?.tab),
            tabList: cn('bg-white', classNames?.tabList),
            tabContent: cn(
              'group-data-[selected=true]:text-white text-navyBlue',
              classNames?.tabContent,
            ),
            cursor: cn('w-full bg-navyBlue', classNames?.cursor),
            base: classNames?.base,
          }}
        >
          {tabs.map(({ keyTab, title, description, icon, content }) => (
            <Tab
              key={keyTab}
              value={keyTab}
              className='h-full w-full'
              title={
                <div className='flex items-center gap-4 px-8 py-2'>
                  {icon}
                  <div className='flex flex-col text-left'>
                    <span className='text-sm font-medium'>{title}</span>
                    <span className='text-[10px] font-normal text-transparentBlack group-data-[selected=true]:text-white'>
                      {description}
                    </span>
                  </div>
                </div>
              }
            >
              {content}
            </Tab>
          ))}
        </Tabs>
      </div>
    </div>
  );
};
