// Constants
import { ROUTES } from '@/constants';

// Components
import { SettingIcon, UserIcon } from '@/components';

export const SIDEBAR_ITEMS = [
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
