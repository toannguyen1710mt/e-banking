// Constants
import { ROUTES } from '@/constants';

// Components
import { SettingIcon, UserIcon } from '@/components';

export const SIDEBAR_ITEM = [
  {
    label: 'General',
    href: ROUTES.GENERAL,
    icon: <UserIcon />,
  },
  {
    label: 'Account',
    href: ROUTES.ACCOUNT,
    icon: <SettingIcon />,
  },
];
