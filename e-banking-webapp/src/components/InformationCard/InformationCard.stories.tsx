// Libs
import type { Meta, StoryObj } from '@storybook/react';

// Components
import { InformationCard } from '@/components';

const meta = {
  title: 'Components/InformationCard',
  component: InformationCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  decorators: [],
} satisfies Meta<typeof InformationCard>;

export default meta;

type Story = StoryObj<typeof InformationCard>;

export const Default: Story = {
  args: {},
};
