// Libs
import type { Meta, StoryObj } from '@storybook/react';

// Components
import {
  GlobalIcon,
  SettingIcon,
  SignOutIcon,
  UserIcon,
  TransferTag,
} from '@/components';

const meta = {
  title: 'Components/TransferTag',
  component: TransferTag,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof TransferTag>;

export default meta;

type Story = StoryObj<typeof TransferTag>;

export const Default: Story = {
  args: {
    tabs: [
      {
        keyTab: 'account',
        title: 'To my Account',
        description: 'Instant transfer between your own accounts',
        icon: <UserIcon width={32} height={32} />,
        content: <p>Account</p>,
      },
      {
        keyTab: 'global',
        title: 'Global Tranfer',
        description: 'Transfer Money across the globe',
        icon: <GlobalIcon width={32} height={32} />,
        content: <p>Global</p>,
      },
    ],
    classNames: {
      tabList: 'bg-slate-50',
    },
  },
};

export const WithCustomClassNames: Story = {
  args: {
    tabs: [
      {
        keyTab: 'settings',
        title: 'Settings',
        description: 'Manage your settings',
        icon: <SettingIcon />,
        content: <div>Settings Content</div>,
      },
      {
        keyTab: 'profile',
        title: 'Profile',
        description: 'Edit your profile information',
        icon: <SignOutIcon />,
        content: <div>Profile Content</div>,
      },
    ],
    classNames: {
      tab: 'bg-gray-100 hover:bg-gray-200',
      cursor: 'bg-blue-500',
    },
  },
};

export const MultipleTabs: Story = {
  args: {
    tabs: [
      {
        keyTab: 'dashboard',
        title: 'Dashboard',
        description: 'Overview of your activities',
        icon: <SettingIcon />,
        content: <div>Dashboard Content</div>,
      },
      {
        keyTab: 'analytics',
        title: 'Analytics',
        description: 'Detailed analytics data',
        icon: <SignOutIcon />,
        content: <div>Analytics Content</div>,
      },
      {
        keyTab: 'reports',
        title: 'Reports',
        description: 'Generate custom reports',
        icon: <SettingIcon />,
        content: <div>Reports Content</div>,
      },
    ],
  },
};
