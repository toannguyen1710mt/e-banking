// Components
import { GlobalIcon, UserIcon, Text } from '@/components';
import { PasswordTab } from '@/components/SettingContainer/Account/PasswordTab';
import { InternalTransferForm } from '@/components/Transfers/InternalTransferForm';

export const TRANSFER_TABS = [
  {
    keyTab: 'account',
    title: 'To my Account',
    description: 'Instant transfer between your own accounts',
    icon: <UserIcon width={32} height={32} />,
    content: <InternalTransferForm />,
  },
  {
    keyTab: 'global',
    title: 'Global Tranfer',
    description: 'Transfer Money across the globe',
    icon: <GlobalIcon width={32} height={32} />,
    content: <Text>Global</Text>,
  },
];

export const ACCOUNT_TABS = [
  { key: 'password', title: 'Change Password', content: <PasswordTab /> },
  { key: 'email', title: 'Email Settings', content: 'Email content' },
  {
    key: 'connected',
    title: 'Connected Accounts',
    content: 'Connected content',
  },
  { key: 'delete', title: 'Delete Account', content: 'Delete content' },
];
