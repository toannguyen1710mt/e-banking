// Libs
import type { Meta, StoryObj } from '@storybook/react';

// Components
import { TransferTab } from '@/components';

const meta = {
  title: 'Components/Transfers/TransferTab',
  component: TransferTab,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof TransferTab>;

export default meta;

type Story = StoryObj<typeof TransferTab>;

export const Default: Story = {};
