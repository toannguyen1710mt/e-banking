// Libs
import type { Meta, StoryObj } from '@storybook/react';

// Interfaces
import { TableProps } from '@/interfaces';

// Mocks
import { MOCK_COLUMNS } from '@/mocks';

// Components
import { SkeletonTable } from '@/components';

const meta = {
  title: 'Components/Skeletons/SkeletonTable',
  component: SkeletonTable,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof SkeletonTable>;

export default meta;

type Story = StoryObj<typeof SkeletonTable>;

export const Default: Story = {
  args: {
    columns: MOCK_COLUMNS,
  } as TableProps<unknown>,
};
