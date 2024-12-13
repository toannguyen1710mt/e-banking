// Libs
import type { Meta, StoryObj } from '@storybook/react';

// Interfaces
import { TableProps } from '@/interfaces';

// Mocks
import { MOCK_COLUMNS, MOCK_TRANSACTIONS } from '@/mocks';

// Components
import { Table } from '@/components';

const meta = {
  title: 'Components/Common/Table',
  component: Table,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Table>;

export default meta;

type Story = StoryObj<typeof Table>;

export const Default: Story = {
  args: {
    columns: MOCK_COLUMNS,
    data: MOCK_TRANSACTIONS,
  } as TableProps<unknown>,
};

export const EmptyTable: Story = {
  args: {
    columns: MOCK_COLUMNS,
    data: [],
  } as TableProps<unknown>,
};
