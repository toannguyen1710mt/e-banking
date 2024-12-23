// Libs
import type { Meta, StoryObj } from '@storybook/react';

// Components
import { DueTile, HomeIcon } from '@/components';

const meta = {
  title: 'Components/DueTile',
  component: DueTile,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  decorators: [],
} satisfies Meta<typeof DueTile>;

export default meta;

type Story = StoryObj<typeof DueTile>;

export const Default: Story = {
  args: {
    icon: <HomeIcon />,
    title: 'Pay Rent',
    createAt: 'Aug 21 at 3:00 pm',
  },
};
