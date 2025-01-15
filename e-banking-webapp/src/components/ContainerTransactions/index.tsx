import { Suspense } from 'react';
import { Session } from 'next-auth';

// Interfaces
import { QueryParams, TEXT_SIZE, TEXT_VARIANT } from '@/interfaces';

// Components
import {
  ActionCenterSkeleton,
  InformationCard,
  Text,
  TransactionHistory,
  TransactionHistorySkeleton,
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

  return (
    <div className='flex w-full flex-col gap-8 px-0 pt-1 lg:px-[22px] xl:flex-row'>
      <div className='flex w-full flex-col xl:w-[55%]'>
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

        <div className='mx-auto mb-[23px] max-w-full md:max-w-[659px] lg:mx-[unset]'>
          <InformationCard session={session} />
        </div>

        <Suspense key={currentPage} fallback={<TransactionHistorySkeleton />}>
          <TransactionHistory currentPage={currentPage} session={session} />
        </Suspense>
      </div>

      <div className='w-full xl:w-[45%]'>
        <Suspense key={currentPage} fallback={<ActionCenterSkeleton />}>
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
