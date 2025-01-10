import { Suspense } from 'react';
import { Session } from 'next-auth';

// Interfaces
import { QueryParams, TEXT_SIZE, TEXT_VARIANT } from '@/interfaces';

// Components
import {
  InformationCard,
  LoadingIndicator,
  Text,
  TransactionHistory,
} from '@/components';
import { ActionCenter } from './ActionCenter';

// Services
import { getTransactionsByUserId } from '@/services';

interface IContainerTransactionsProps {
  session: Session;
  currentPage: number;
}

export const ContainerTransactions = async ({
  session,
  currentPage,
}: IContainerTransactionsProps) => {
  const defaultQueryParams: QueryParams = {
    sort: 'createdAt',
    order: 'desc',
    pagination: {
      page: currentPage,
      pageSize: 10,
    },
  };

  // Get transfers received
  const {
    meta: {
      pagination: { total: totalTransferReceived },
    },
  } = await getTransactionsByUserId(session.user.id, {
    ...defaultQueryParams,
    pagination: {
      page: currentPage,
      pageSize: 10,
    },
    filters: {
      toAccountType: {
        $notNull: undefined,
      },
    },
  });

  // Get transfers sent
  const {
    meta: {
      pagination: { total: totalTransferSent },
    },
  } = await getTransactionsByUserId(session.user.id, {
    ...defaultQueryParams,
    pagination: {
      page: currentPage,
      pageSize: 10,
    },
    filters: {
      toAccountType: {
        $null: undefined,
      },
    },
  });

  // Get all transfers
  const {
    data: transactions,
    meta: {
      pagination: { pageCount, total },
    },
  } = await getTransactionsByUserId(session.user.id, defaultQueryParams);

  return (
    <div className='flex w-full gap-8 px-[22px] pt-1'>
      <div className='flex w-2/3 flex-col'>
        <Text
          as='h4'
          variant={TEXT_VARIANT.DEFAULT}
          size={TEXT_SIZE['2XL']}
          className='mb-[18px] font-medium'
        >
          Welcome Back,&nbsp;
          <Text
            as='span'
            variant={TEXT_VARIANT.DEFAULT}
            size={TEXT_SIZE['2XL']}
            className='font-medium'
          >
            {session?.user?.username || ''}
          </Text>
        </Text>

        <div className='mb-[23px] max-w-[659px]'>
          <InformationCard session={session} />
        </div>

        {/* Todo: Implement Skeleton for Transaction History */}
        <Suspense key={currentPage} fallback={<LoadingIndicator />}>
          <TransactionHistory
            currentPage={currentPage}
            totalPage={pageCount}
            totalTransaction={total}
            transactions={transactions}
          />
        </Suspense>
      </div>

      <div className='w-1/3'>
        {/* Todo: Implement Skeleton for Action Center */}
        <Suspense key={currentPage} fallback={<LoadingIndicator />}>
          <ActionCenter
            totalTransferReceived={totalTransferReceived}
            totalTransferSent={totalTransferSent}
            session={session}
          />
        </Suspense>
      </div>
    </div>
  );
};
