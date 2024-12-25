// Libs
import type { Meta, StoryObj } from '@storybook/react';

// Components
import { DeleteAccountTab } from '@/components';

const meta = {
  title: 'Components/DeleteAccountTab',
  component: DeleteAccountTab,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  decorators: [],
} satisfies Meta<typeof DeleteAccountTab>;

export default meta;

type Story = StoryObj<typeof DeleteAccountTab>;

export const Default: Story = {
  args: {},
};
