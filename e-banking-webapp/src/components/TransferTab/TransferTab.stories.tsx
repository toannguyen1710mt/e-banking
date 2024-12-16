// Libs
import type { Meta, StoryObj } from '@storybook/react';

// Constants
import { TRANSFER_TABS } from '@/constants';

// Components
import { TransferTab } from '@/components';

const meta = {
  title: 'Components/TransferTab',
  component: TransferTab,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof TransferTab>;

export default meta;

type Story = StoryObj<typeof TransferTab>;

export const Default: Story = {
  args: {
    TransferTabs: TRANSFER_TABS,
  },
};
