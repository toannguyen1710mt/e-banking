// Libs
import type { Meta, StoryObj } from '@storybook/react';

// Components
import { Sidebar } from '@/components';

// Meta configuration
const meta = {
  title: 'Components/Sidebar',
  component: Sidebar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    sidebarItem: {
      description: 'Array of sidebar items to display',
      control: {
        type: 'object',
      },
    },
  },
  args: {},
} satisfies Meta<typeof Sidebar>;

export default meta;

type Story = StoryObj<typeof meta>;

// Default story for Sidebar
export const Default: Story = {
  args: {},
};
