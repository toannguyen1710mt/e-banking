'use client';

// Libs
import { ReactNode } from 'react';
import { Tab, TabsProps } from '@nextui-org/react';

// components
import { TabsCustom } from '@/components';

interface ITransferTab extends TabsProps {
  TransferTabs: {
    keyTab: string;
    title: string;
    description: string;
    icon: ReactNode;
    content: ReactNode;
    textClass?: string;
  }[];
}

export const TransferTab = ({ TransferTabs, ...tabProps }: ITransferTab) => (
  <div className='flex h-full w-full flex-col rounded-xl bg-lightGraySolid'>
    <TabsCustom aria-label='Options' placement='start' {...{ tabProps }}>
      {TransferTabs.map(
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
);
