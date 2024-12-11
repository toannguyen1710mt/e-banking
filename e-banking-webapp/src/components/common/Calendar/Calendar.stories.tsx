// Libs
import type { Meta, StoryObj } from '@storybook/react';

// Components
import { Calendar } from '@/components';

const meta = {
  title: 'Components/Common/Calendar',
  component: Calendar,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Calendar>;

export default meta;

type Story = StoryObj<typeof Calendar>;

export const Default: Story = {};
