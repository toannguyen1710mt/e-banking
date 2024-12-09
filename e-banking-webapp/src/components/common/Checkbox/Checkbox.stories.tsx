// Libs
import type { Meta, StoryObj } from '@storybook/react';

// Components
import { Checkbox } from '@/components';

const meta = {
  title: 'Components/Common/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Checkbox>;

export default meta;

type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  args: {
    children: 'Annoucements',
  },
};

export const Disable: Story = {
  args: {
    children: 'Annoucements',
    isDisabled: true,
  },
};
