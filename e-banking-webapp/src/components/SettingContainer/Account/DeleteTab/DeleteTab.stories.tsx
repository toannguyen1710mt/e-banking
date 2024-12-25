// Libs
import type { Meta, StoryObj } from '@storybook/react';

// Components
import { DeleteTab } from '@/components';

const meta = {
  title: 'Components/DeleteTab',
  component: DeleteTab,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  decorators: [],
} satisfies Meta<typeof DeleteTab>;

export default meta;

type Story = StoryObj<typeof DeleteTab>;

export const Default: Story = {
  args: {},
};
