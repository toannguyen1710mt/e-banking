// Libs
import type { Meta, StoryObj } from '@storybook/react';

// Components
import { QuickAction } from '@/components';

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

export const Default: Story = {};
