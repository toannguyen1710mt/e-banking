// Libs
import type { Meta, StoryObj } from '@storybook/react';

// Mocks
import { TRANSFER_CONFIRM_DATA } from '@/mocks';

// Components
import { ConfirmGlobalTransfer } from '@/components';

const meta = {
  title: 'Components/ConfirmGlobalTransfer',
  component: ConfirmGlobalTransfer,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof ConfirmGlobalTransfer>;

export default meta;

type Story = StoryObj<typeof ConfirmGlobalTransfer>;

export const Default: Story = {
  args: TRANSFER_CONFIRM_DATA,
  render: (args) => <ConfirmGlobalTransfer {...args} />,
};
