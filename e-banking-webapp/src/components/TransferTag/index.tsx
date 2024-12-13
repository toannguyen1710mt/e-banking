'use client';

// Libs
import { ReactNode } from 'react';
import { Tab } from '@nextui-org/react';
import { TabsCustom } from '@/components';

interface ITransferTag {
  TransferTagItem: {
    keyTab: string;
    title: string;
    description: string;
    icon: ReactNode;
    content: ReactNode;
    textClass?: string;
  }[];
}

export const TransferTag = ({ TransferTagItem }: ITransferTag) => (
  <div className='flex h-full flex-col px-4'>
    <div className='flex h-full w-full flex-col'>
      <TabsCustom aria-label='Options' placement='start'>
        {TransferTagItem.map(
          ({ keyTab, title, description, icon, content, textClass }) => {
            const appliedTextClass =
              textClass ||
              'text-transparentBlack group-data-[selected=true]:text-white';

            return (
              <Tab
                key={keyTab}
                value={keyTab}
                className='h-full w-full'
                title={
                  <div className='flex items-center gap-4 px-8 py-2'>
                    {icon}
                    <div className='flex flex-col text-left'>
                      <span className='text-sm font-medium'>{title}</span>
                      <span
                        className={`text-[10px] font-normal ${appliedTextClass}`}
                      >
                        {description}
                      </span>
                    </div>
                  </div>
                }
              >
                {content}
              </Tab>
            );
          },
        )}
      </TabsCustom>
    </div>
  </div>
);
