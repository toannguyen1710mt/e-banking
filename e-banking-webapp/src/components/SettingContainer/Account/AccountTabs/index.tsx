'use client';

// Libs
import { Key, useEffect, useState } from 'react';
import { Session } from 'next-auth';
import { Tab, Tabs } from '@nextui-org/react';

// Constants
import { ERROR_MESSAGES } from '@/constants';

// Actions
import { updateEmailSettings } from '@/actions';

// Interfaces
import { Preferences } from '@/interfaces';

// Services
import { getUserById } from '@/services';

// Utils
import { toastStore } from '@/utils';

// Components
import { EmailTab } from '../EmailTab';
import { PasswordTab } from '../PasswordTab';
import { ConnectedAccountsTab } from '../ConnectedAccountsTab';
import { DeleteAccountTab } from '../DeleteAccountTab';

interface IAccountTabsProps {
  session: Session;
}

export const AccountTabs = ({ session }: IAccountTabsProps) => {
  const [unsavedChanges, setUnsavedChanges] = useState(false);
  const [activeTab, setActiveTab] = useState('password');
  const [preferences, setPreferences] = useState<Preferences>(
    {} as Preferences,
  );
  const { id } = session.user;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { user } = await getUserById(id);
        if (user) {
          const {
            announcements,
            updates,
            feedbacksAndSurvey,
            events,
            generalNotification,
            promotions,
            eventsNearMe,
          } = user;

          const newPreferences = {
            announcements: announcements || false,
            updates: updates || false,
            feedbacksAndSurvey: feedbacksAndSurvey || false,
            events: events || false,
            generalNotification: generalNotification || false,
            promotions: promotions || false,
            eventsNearMe: eventsNearMe || false,
          };

          setPreferences(newPreferences);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchUserData();
  }, [id]);

  const handleUpdateEmailSettings = async (data: Preferences) => {
    try {
      await updateEmailSettings(id, data);

      toastStore.showToast(
        ERROR_MESSAGES.UPDATE_EMAIL_SETTINGS_SUCCESS,
        'success',
        'top-center',
      );
      setPreferences(data);

      return;
    } catch (error) {
      if (error instanceof Error) {
        return error.message;
      }
      return ERROR_MESSAGES.UPDATE_ERROR;
    }
  };

  const confirmNavigation = (nextTab: string) => {
    const userConfirmed = window.confirm(
      'The entered data will not be saved. Do you want to leave?',
    );

    if (userConfirmed) {
      setUnsavedChanges(false);
      setActiveTab(nextTab);
    }
  };

  const handleTabChange = (nextTab: Key) => {
    const nextTabKey = String(nextTab);

    if (unsavedChanges) {
      confirmNavigation(nextTabKey);
    } else {
      setActiveTab(nextTabKey);
    }
  };

  const ACCOUNT_TABS = [
    {
      key: 'password',
      title: 'Change Password',
      content: (
        <PasswordTab
          session={session}
          onUnsavedChanges={(hasChanges) => setUnsavedChanges(hasChanges)}
        />
      ),
    },
    {
      key: 'email',
      title: 'Email Settings',
      content: (
        <EmailTab
          {...preferences}
          onSubmit={handleUpdateEmailSettings}
          onUnsavedChanges={(hasChanges) => setUnsavedChanges(hasChanges)}
        />
      ),
    },
    {
      key: 'connected',
      title: 'Connected Accounts',
      content: <ConnectedAccountsTab />,
    },
    { key: 'delete', title: 'Delete Account', content: <DeleteAccountTab /> },
  ];

  return (
    <Tabs
      classNames={{
        base: 'block',
        tabList: 'gap-8 w-full',
        cursor: 'w-full shadow-none',
        tab: 'max-w-fit text-[13px] font-normal p-0',
        tabContent:
          'group-data-[selected=true]:text-sm group-data-[selected=true]:font-semibold group-data-[selected=true]:text-primary-200 group-data-[selected=true]:border-none',
      }}
      variant='light'
      selectedKey={activeTab}
      onSelectionChange={handleTabChange}
    >
      {ACCOUNT_TABS.map(({ key, title, content }, index) => (
        <Tab
          key={key}
          aria-label={`label-account-tabs-${index}`}
          title={<span>{title}</span>}
        >
          <div className='pl-[105px] pr-6 pt-16 max-[800px]:pl-0'>
            {content}
          </div>
        </Tab>
      ))}
    </Tabs>
  );
};
