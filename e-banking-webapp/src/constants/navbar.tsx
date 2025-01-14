import { ROUTES } from '@/constants';
import Link from 'next/link';

export const NavbarItem = [
  {
    text: 'Home',
    path: ROUTES.HOME,
  },
  {
    text: 'Analytics',
    path: ROUTES.ANALYTICS,
  },
  {
    text: 'Transactions',
    path: ROUTES.TRANSACTIONS,
  },
];

export const NavbarItemMobile = [
  {
    key: 'Home',
    label: 'Home',
    customOptionElement: <Link href={ROUTES.HOME}>Home</Link>,
  },
  {
    key: 'Analytics',
    label: 'Analytics',
    customOptionElement: <Link href={ROUTES.ANALYTICS}>Analytics</Link>,
  },
  {
    key: 'Transactions',
    label: 'Transactions',
    customOptionElement: <Link href={ROUTES.TRANSACTIONS}>Transactions</Link>,
  },
  {
    key: 'General',
    label: 'General',
    customOptionElement: <Link href={ROUTES.GENERAL}>General</Link>,
  },
  {
    key: 'Account',
    label: 'Account',
    path: <Link href={ROUTES.ACCOUNT}>General</Link>,
  },
];
