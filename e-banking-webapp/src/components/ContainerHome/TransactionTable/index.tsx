'use client';

import { Card, CardBody, CardHeader } from '@nextui-org/react';

// Mocks
import { MOCK_COLUMNS } from '@/mocks';

// Interfaces
import { TEXT_SIZE, TEXT_VARIANT } from '@/interfaces';

// Components
import { Table, Text } from '@/components';

export const TransactionTable = () => (
  <Card className='rounded-md'>
    <CardHeader className='flex justify-between'>
      <Text size={TEXT_SIZE.XS} variant={TEXT_VARIANT.DEFAULT}>
        Transactions History
      </Text>
    </CardHeader>

    <CardBody className='flex flex-col p-0'>
      <Table columns={MOCK_COLUMNS} data={[]} />
    </CardBody>
  </Card>
);
