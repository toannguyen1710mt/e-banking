// Libs
import type { Meta, StoryObj } from '@storybook/react';

// Components
import { ActionCenter } from '.';

const meta = {
  title: 'Components/ActionCenter',
  component: ActionCenter,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  decorators: [],
} satisfies Meta<typeof ActionCenter>;

export default meta;

type Story = StoryObj<typeof ActionCenter>;

export const Default: Story = {
  args: {},
};
