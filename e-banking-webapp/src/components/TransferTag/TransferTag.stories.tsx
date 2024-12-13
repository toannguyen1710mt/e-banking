// Libs
import type { Meta, StoryObj } from '@storybook/react';

// Constants
import { TRANSFER_TABS } from '@/constants';

// Components
import { TransferTag } from '@/components';

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
    TransferTabs: TRANSFER_TABS,
  },
};
