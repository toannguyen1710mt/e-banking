// Libs
import { Suspense } from 'react';
import { Card, CardBody, CardHeader } from '@nextui-org/react';

// Constants
import { TRANSACTION_TABLE_COLUMNS } from '@/constants';

// Interfaces
import { TEXT_SIZE, TEXT_VARIANT } from '@/interfaces';

// Components
import { Text, SkeletonTable } from '@/components';
import { TransactionTable } from '@/components/ContainerHome/TransactionTable';

// Services
import { getTransactions } from '@/services';

export const TransactionHistory = async () => {
  const transactions = await getTransactions({
    sort: 'createdAt',
    order: 'desc',
    pagination: { page: 1, pageSize: 10 },
  });

  return (
    <Card className='rounded-md'>
      <CardHeader className='flex justify-between'>
        <Text size={TEXT_SIZE.XS} variant={TEXT_VARIANT.DEFAULT}>
          Transactions History
        </Text>
      </CardHeader>

      <CardBody className='flex flex-col p-0'>
        <Suspense
          fallback={<SkeletonTable columns={TRANSACTION_TABLE_COLUMNS} />}
        >
          <TransactionTable transactions={transactions} />
        </Suspense>
      </CardBody>
    </Card>
  );
};
