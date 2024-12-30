// Libs
import type { Meta, StoryObj } from '@storybook/react';
import { Test } from '.';

const meta = {
  title: 'Components/Test01',
  component: Test,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  decorators: [],
} satisfies Meta<typeof Test>;

export default meta;

type Story = StoryObj<typeof Test>;

export const Default: Story = {
  args: {},
};
