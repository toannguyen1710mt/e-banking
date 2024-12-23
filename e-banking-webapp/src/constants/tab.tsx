// Components
import { EmailTab } from '@/components/SettingContainer/Account/EmailTab';
import { PasswordTab } from '@/components/SettingContainer/Account/PasswordTab';

export const ACCOUNT_TABS = [
  { key: 'password', title: 'Change Password', content: <PasswordTab /> },
  { key: 'email', title: 'Email Settings', content: <EmailTab /> },
  {
    key: 'connected',
    title: 'Connected Accounts',
    content: 'Connected content',
  },
  { key: 'delete', title: 'Delete Account', content: 'Delete content' },
];

export const ACCOUNT_TABS = [
  { key: 'password', title: 'Change Password', content: 'Password content' },
  { key: 'email', title: 'Email Settings', content: 'Email content' },
  {
    key: 'connected',
    title: 'Connected Accounts',
    content: 'Connected content',
  },
  { key: 'delete', title: 'Delete Account', content: 'Delete content' },
];
