// Libs
import type { Meta, StoryObj } from '@storybook/react';

// Mocks
import { MOCK_SESSION_DATA } from '@/mocks';

// Components
import { CardOverview } from '@/components';

const meta = {
  title: 'Components/CardOverview',
  component: CardOverview,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  decorators: [],
} satisfies Meta<typeof CardOverview>;

export default meta;

type Story = StoryObj<typeof CardOverview>;

export const Default: Story = {
  args: { session: MOCK_SESSION_DATA },
};
