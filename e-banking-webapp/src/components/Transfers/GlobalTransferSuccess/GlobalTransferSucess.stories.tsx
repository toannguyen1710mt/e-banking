// Libs
import type { Meta, StoryObj } from '@storybook/react';

// Components
import { GlobalTransferSuccess } from '@/components';

const meta = {
  title: 'Components/Transfers/GlobalTransferSuccess',
  tags: ['autodocs'],
  component: GlobalTransferSuccess,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof GlobalTransferSuccess>;

export default meta;

type Story = StoryObj<typeof GlobalTransferSuccess>;

export const Default: Story = {
  args: {
    onClose: () => {},
  },
};
