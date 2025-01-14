// Libs
import { ROUTES } from './routes';

// Components
import { SettingIcon, UserIcon } from '@/components/icons';

export const SIDEBAR_LIST = [
  {
    href: ROUTES.GENERAL,
    label: 'General',
    Icon: UserIcon,
  },
  {
    href: ROUTES.ACCOUNT,
    label: 'Account',
    Icon: SettingIcon,
  },
];
