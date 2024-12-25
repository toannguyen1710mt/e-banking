// Components
import { ConnectedAccountsTab } from '@/components/SettingContainer/Account/ConnectedAccountsTab';
import { DeleteAccountTab } from '@/components/SettingContainer/Account/DeleteAccountTab';
import { EmailTab } from '@/components/SettingContainer/Account/EmailTab';
import { PasswordTab } from '@/components/SettingContainer/Account/PasswordTab';
import { MOCK_SESSION_DATA } from '@/mocks';

export const ACCOUNT_TABS = [
  {
    key: 'password',
    title: 'Change Password',
    content: <PasswordTab session={MOCK_SESSION_DATA} />,
  },
  { key: 'email', title: 'Email Settings', content: <EmailTab /> },
  {
    key: 'connected',
    title: 'Connected Accounts',
    content: <ConnectedAccountsTab />,
  },
  { key: 'delete', title: 'Delete Account', content: <DeleteAccountTab /> },
];
