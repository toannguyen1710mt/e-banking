'use client';

// Mocks
import { MOCK_COLUMNS } from '@/mocks';

// Components
import { Table } from '@/components';

export const TransactionTable = () => (
  <>
    <Table columns={MOCK_COLUMNS} data={[]} />{' '}
  </>
);
