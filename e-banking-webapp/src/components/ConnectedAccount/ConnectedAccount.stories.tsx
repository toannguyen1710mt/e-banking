// Libs
import type { Meta, StoryObj } from '@storybook/react';

// Components
import { ConnectedAccount } from '@/components';

const meta = {
  title: 'Components/ConnectedAccount',
  component: ConnectedAccount,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  decorators: [],
} satisfies Meta<typeof ConnectedAccount>;

export default meta;

type Story = StoryObj<typeof ConnectedAccount>;

export const Default: Story = {
  args: {},
};
