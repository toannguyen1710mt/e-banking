// Libs
import type { Meta, StoryObj } from '@storybook/react';

// Components
import { InternalTransferSteps } from '@/components';

// Mocks
import { MOCK_SESSION_DATA } from '@/mocks';

const meta = {
  title: 'Components/Transfers/InternalTransferSteps',
  tags: ['autodocs'],
  component: InternalTransferSteps,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof InternalTransferSteps>;

export default meta;

type Story = StoryObj<typeof InternalTransferSteps>;

export const Default: Story = {
  args: {
    session: MOCK_SESSION_DATA,
  },
};
