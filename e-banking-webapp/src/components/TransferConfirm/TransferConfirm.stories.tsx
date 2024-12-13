// Libs
import type { Meta, StoryObj } from '@storybook/react';

// Constants
import { TRANSFER_CONFIRM_DATA } from '@/constants';

// Components
import { TransferConfirm } from '@/components';

const meta = {
  title: 'Components/TransferConfirm',
  component: TransferConfirm,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof TransferConfirm>;

export default meta;

type Story = StoryObj<typeof TransferConfirm>;

export const Default: Story = {
  args: TRANSFER_CONFIRM_DATA,
  render: (args) => <TransferConfirm {...args} />,
};
