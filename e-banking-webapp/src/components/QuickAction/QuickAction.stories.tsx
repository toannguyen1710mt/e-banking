// Libs
import type { Meta, StoryObj } from '@storybook/react';

// Components
import { QuickAction } from '@/components';

// Mocks
import { MOCK_ACTIONS } from '@/mocks';

const meta = {
  title: 'Components/QuickAction',
  tags: ['autodocs'],
  component: QuickAction,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof QuickAction>;

export default meta;

type Story = StoryObj<typeof QuickAction>;

export const QuickActionDefault: Story = {
  args: {
    actions: MOCK_ACTIONS,
  },
};
