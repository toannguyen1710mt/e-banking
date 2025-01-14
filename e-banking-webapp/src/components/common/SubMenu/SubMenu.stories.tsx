// Libs
import type { Meta, StoryObj } from '@storybook/react';

// Components
import { SubMenu } from '@/components';

const meta = {
  title: 'Components/Common/SubMenu',
  component: SubMenu,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  decorators: [],
} satisfies Meta<typeof SubMenu>;

export default meta;

type Story = StoryObj<typeof SubMenu>;

export const Default: Story = {
  args: {},
};
