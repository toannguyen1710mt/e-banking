// Libs
import type { Meta, StoryObj } from '@storybook/react';

// Components
import { ConnectedAccountsTab } from '@/components';

const meta = {
  title: 'Components/ConnectedAccountsTab',
  component: ConnectedAccountsTab,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  decorators: [],
} satisfies Meta<typeof ConnectedAccountsTab>;

export default meta;

type Story = StoryObj<typeof ConnectedAccountsTab>;

export const Default: Story = {
  args: {},
};
