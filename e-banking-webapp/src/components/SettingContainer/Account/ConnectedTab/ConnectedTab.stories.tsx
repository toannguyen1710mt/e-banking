// Libs
import type { Meta, StoryObj } from '@storybook/react';

// Components
import { ConnectedTab } from '@/components';

const meta = {
  title: 'Components/ConnectedTab',
  component: ConnectedTab,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  decorators: [],
} satisfies Meta<typeof ConnectedTab>;

export default meta;

type Story = StoryObj<typeof ConnectedTab>;

export const Default: Story = {
  args: {},
};
