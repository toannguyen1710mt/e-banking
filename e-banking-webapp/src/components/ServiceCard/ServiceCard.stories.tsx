// Libs
import type { Meta, StoryObj } from '@storybook/react';

// Components
import { HouseIcon, ServiceCard } from '@/components';

const meta = {
  title: 'Components/ServiceCard',
  component: ServiceCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  decorators: [],
} satisfies Meta<typeof ServiceCard>;

export default meta;

type Story = StoryObj<typeof ServiceCard>;

export const Default: Story = {
  args: {
    icon: <HouseIcon />,
    title: 'Mortgage',
    amount: 1100,
  },
};
