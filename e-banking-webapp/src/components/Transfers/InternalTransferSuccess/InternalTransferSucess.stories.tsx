// Libs
import type { Meta, StoryObj } from '@storybook/react';

// Components
import { InternalTransferSuccess } from '@/components';

const meta = {
  title: 'Components/Transfers/InternalTransferSuccess',
  tags: ['autodocs'],
  component: InternalTransferSuccess,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof InternalTransferSuccess>;

export default meta;

type Story = StoryObj<typeof InternalTransferSuccess>;

export const Default: Story = {
  args: {
    onClose: () => {},
  },
};
