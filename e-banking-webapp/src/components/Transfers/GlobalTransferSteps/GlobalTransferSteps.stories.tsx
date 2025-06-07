// Libs
import type { Meta, StoryObj } from '@storybook/react';

// Components
import { GlobalTransferSteps } from '@/components';

// Mocks
import { MOCK_SESSION_DATA } from '@/mocks';

const meta = {
  title: 'Components/Transfers/GlobalTransferSteps',
  tags: ['autodocs'],
  component: GlobalTransferSteps,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof GlobalTransferSteps>;

export default meta;

type Story = StoryObj<typeof GlobalTransferSteps>;

export const Default: Story = {
  args: {
    session: MOCK_SESSION_DATA,
  },
};
