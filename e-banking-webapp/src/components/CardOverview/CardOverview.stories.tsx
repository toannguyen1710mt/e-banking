// Libs
import type { Meta, StoryObj } from '@storybook/react';

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
  args: {},
};
