// Libs
import type { Meta, StoryObj } from '@storybook/react';

// Interfaces
import { TableProps } from '@/interfaces';

// Mocks
import { MOCK_COLUMNS } from '@/mocks';

// Components
import { TableSkeleton } from '@/components';

const meta = {
  title: 'Components/Skeletons/TableSkeleton',
  component: TableSkeleton,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof TableSkeleton>;

export default meta;

type Story = StoryObj<typeof TableSkeleton>;

export const Default: Story = {
  args: {
    columns: MOCK_COLUMNS,
  } as TableProps<unknown>,
};
