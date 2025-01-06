// Libs
import type { Meta, StoryObj } from '@storybook/react';

// Components
import { Pagination } from '@/components';

const meta = {
  title: 'Components/Common/Pagination',
  component: Pagination,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Pagination>;

export default meta;

type Story = StoryObj<typeof Pagination>;

export const Default: Story = {
  args: {
    currentPage: 1,
    totalPage: 100,
  },
};
