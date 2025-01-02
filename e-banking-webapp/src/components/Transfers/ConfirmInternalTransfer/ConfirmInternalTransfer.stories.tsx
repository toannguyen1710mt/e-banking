// Libs
import type { Meta, StoryObj } from '@storybook/react';

// Components
import { ConfirmInternalTransfer } from '@/components';

const meta = {
  title: 'Components/Transfers/ConfirmInternalTransfer',
  tags: ['autodocs'],
  component: ConfirmInternalTransfer,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof ConfirmInternalTransfer>;

export default meta;

type Story = StoryObj<typeof ConfirmInternalTransfer>;

export const Default: Story = {
  args: {},
};
