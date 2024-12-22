// Libs
import type { Meta, StoryObj } from '@storybook/react';

// Components
import { DeleteAccount } from '@/components';

const meta = {
  title: 'Components/DeleteAccount',
  component: DeleteAccount,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  decorators: [],
} satisfies Meta<typeof DeleteAccount>;

export default meta;

type Story = StoryObj<typeof DeleteAccount>;

export const Default: Story = {
  args: {},
};
