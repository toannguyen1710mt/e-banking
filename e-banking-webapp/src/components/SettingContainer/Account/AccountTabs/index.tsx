'use client';

import { Tab, Tabs } from '@nextui-org/react';
import { Session } from 'next-auth';

// Components
import { EmailTab } from '../EmailTab';
import { PasswordTab } from '../PasswordTab';

interface IAccountTabsProps {
  session: Session;
}

export const AccountTabs = ({ session }: IAccountTabsProps) => {
  const ACCOUNT_TABS = [
    {
      key: 'password',
      title: 'Change Password',
      content: <PasswordTab session={session} />,
    },
    { key: 'email', title: 'Email Settings', content: <EmailTab /> },
    {
      key: 'connected',
      title: 'Connected Accounts',
      content: 'Connected content',
    },
    { key: 'delete', title: 'Delete Account', content: 'Delete content' },
  ];

  return (
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
};
