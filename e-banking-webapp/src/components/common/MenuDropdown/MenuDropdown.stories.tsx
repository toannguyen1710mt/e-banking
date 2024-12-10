// Libs
import type { Meta, StoryObj } from '@storybook/react';
import { Avatar } from '@nextui-org/react';

// Components
import { SettingIcon, SignOutIcon, MenuDropdown } from '@/components';

const defaultOptions = [
  {
    key: 'Edit',
    label: 'Edit',
  },
  {
    key: 'Delete',
    label: 'Delete',
  },
];

const withIconOptions = [
  {
    key: 'Settings',
    label: 'Settings',
    startContent: <SettingIcon />,
  },
  {
    key: 'Sign Out',
    label: 'Sign Out',
    startContent: <SignOutIcon />,
  },
];

const readOnlyOptions = [
  {
    key: 'Edit',
    label: 'Edit',
    isReadOnly: true,
  },
  {
    key: 'Delete',
    label: 'Delete',
    isReadOnly: true,
  },
];

const meta = {
  title: 'Components/Common/MenuDropdown',
  tags: ['autodocs'],
  component: MenuDropdown,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof MenuDropdown>;

export default meta;

type Story = StoryObj<typeof MenuDropdown>;

export const Default: Story = {
  args: {
    label: 'Open Menu',
    options: defaultOptions,
  },
};

export const OptionsWithIcon: Story = {
  args: {
    label: 'Open Menu',
    options: withIconOptions,
  },
};

export const ReadOnlyOptions: Story = {
  args: {
    label: 'Open Menu',
    options: readOnlyOptions,
  },
};

export const DividedOptions: Story = {
  args: {
    label: 'Open Menu',
    options: defaultOptions,
    isDivided: true,
  },
};

export const CustomTriggerOptions: Story = {
  args: {
    label: 'Open Menu',
    options: defaultOptions,
    customTriggerElement: <Avatar />,
  },
};
