import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

// Components
import { Button } from '.';
import { ChevronDownIcon, PaypalIcon } from '@/components';

const meta = {
  title: 'Components/Common/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    disabled: { control: 'boolean' },
    variant: {
      control: 'inline-radio',
      options: ['solid', 'outline', 'bordered'],
    },
    color: {
      control: 'inline-radio',
      options: [
        'default',
        'tertiary',
        'danger',
        'outline',
        'primary',
        'secondary',
      ],
    },
    size: {
      control: 'inline-radio',
      options: ['default', 'xxs', 'xs', 'sm', 'base', 'md', 'lg', 'xl'],
    },
    radius: {
      control: 'inline-radio',
      options: ['xs', 'sm', 'md'],
    },
  },
  args: {
    onClick: fn(),
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Register',
  },
};

export const Tertiary: Story = {
  args: {
    children: 'Cancel',
    variant: 'solid',
    color: 'tertiary',
    size: 'md',
    radius: 'xs',
  },
};

export const Danger: Story = {
  args: {
    children: 'Delete Account',
    variant: 'solid',
    color: 'danger',
    size: 'base',
    radius: 'xs',
  },
};

export const Connected: Story = {
  args: {
    startContent: <PaypalIcon />,
    children: 'Connected to Google Pay',
    variant: 'solid',
    color: 'secondary',
    radius: 'xs',
    size: 'xl',
  },
};

export const Outline: Story = {
  args: {
    children: 'Make payment',
    variant: 'outline',
    size: 'xs',
    color: 'outline',
    radius: 'xs',
  },
};

export const Select: Story = {
  args: {
    endContent: <ChevronDownIcon />,
    children: 'Select Monthly',
    variant: 'bordered',
    size: 'default',
    color: 'outline',
    radius: 'sm',
    className: 'w-[118px]',
  },
};
