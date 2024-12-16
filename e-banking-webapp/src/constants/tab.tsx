// Components
import { GlobalIcon, UserIcon, Text } from '@/components';

export const TRANSFER_TABS = [
  {
    keyTab: 'account',
    title: 'To my Account',
    description: 'Instant transfer between your own accounts',
    icon: <UserIcon width={32} height={32} />,
    content: <Text>Account</Text>,
  },
  {
    keyTab: 'global',
    title: 'Global Tranfer',
    description: 'Transfer Money across the globe',
    icon: <GlobalIcon width={32} height={32} />,
    content: <Text>Global</Text>,
  },
];
