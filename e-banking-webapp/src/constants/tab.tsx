// Components
import { ConnectedTab } from '@/components/SettingContainer/Account/ConnectedTab';
import { DeleteTab } from '@/components/SettingContainer/Account/DeleteTab';
import { EmailTab } from '@/components/SettingContainer/Account/EmailTab';
import { PasswordTab } from '@/components/SettingContainer/Account/PasswordTab';

export const ACCOUNT_TABS = [
  { key: 'password', title: 'Change Password', content: <PasswordTab /> },
  { key: 'email', title: 'Email Settings', content: <EmailTab /> },
  {
    key: 'connected',
    title: 'Connected Accounts',
    content: <ConnectedTab />,
  },
  { key: 'delete', title: 'Delete Account', content: <DeleteTab /> },
];
