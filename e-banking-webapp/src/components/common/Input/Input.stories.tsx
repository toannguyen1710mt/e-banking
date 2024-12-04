import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

// Components
import { Input } from '.';
import { LockIcon } from '@/components';

const meta = {
  title: 'Components/Common/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    disabled: { control: 'boolean' },
    color: {
      control: 'inline-radio',
      options: ['default'],
    },
    border: {
      control: 'inline-radio',
      options: ['default'],
    },
    size: {
      control: 'inline-radio',
      options: ['xs'],
    },
    radius: {
      control: 'inline-radio',
      options: ['xs'],
    },
    textSize: {
      control: 'inline-radio',
      options: ['base'],
    },
  },
  args: {
    onClick: fn(),
  },
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'pheroxios@yehudi.com|',
  },
};

export const WithIcon: Story = {
  args: {
    placeholder: 'Password',
    startContent: <LockIcon />,
  },
};

export const WithErrorMessage: Story = {
  args: {
    isInvalid: true,
    errorMessage: 'Please enter a valid email address',
    value: 'Email',
  },
};

export const WithLabel: Story = {
  args: {
    label: 'Cards Holder',
    labelPlacement: 'outside',
    value: 'Email',
  },
};
