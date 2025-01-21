'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { Session } from 'next-auth';
import { Spinner } from '@nextui-org/react';

// Interfaces
import { ITransaction, TEXT_SIZE, TransferType } from '@/interfaces';

// Components
import { MetricsCard, Text, TransferTable } from '@/components';

// Services
import { getTransactionsByUserId } from '@/services';

interface ITransferManagerProps {
  totalTransferReceived: number;
  totalTransferSent: number;
  session: Session;
}

export const TransferManager = ({
  totalTransferReceived,
  totalTransferSent,
  session,
}: ITransferManagerProps) => {
  const [selectedTransferType, setSelectedTransferType] = useState<
    TransferType.RECEIVED | TransferType.SENT
  >(TransferType.RECEIVED);

  const [transactions, setTransactions] = useState<ITransaction[]>([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isInitialFetch, setIsInitialFetch] = useState(true);

  const observerRef = useRef<HTMLDivElement>(null);

  const handleSelectTransfer = (transferType: TransferType) => {
    setSelectedTransferType(transferType);
    setIsInitialFetch(true);
    setHasMore(true);
  };

  const fetchTransactions = useCallback(
    async (transferType: TransferType, isInitialFetch: boolean) => {
      const nextPage = isInitialFetch ? 1 : currentPage + 1;

      const filters =
        transferType === TransferType.RECEIVED
          ? {
              toAccountType: {
                $notNull: undefined,
              },
            }
          : {
              toAccountType: {
                $null: undefined,
              },
            };

      const { data, meta } = await getTransactionsByUserId(session.user.id, {
        sort: 'createdAt',
        order: 'desc',
        filters,
        pagination: { page: nextPage },
      });

      setTransactions((prev) => (isInitialFetch ? data : [...prev, ...data]));
      setCurrentPage(nextPage);
      setIsInitialFetch(false);

      if (meta.pagination.page >= meta.pagination.pageCount) {
        setHasMore(false);
      }
    },
    [currentPage, session.user.id],
  );

  const fetchMoreTransactions = useCallback(() => {
    fetchTransactions(selectedTransferType, false);
  }, [fetchTransactions, selectedTransferType]);

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [target] = entries;

      if (target.isIntersecting && hasMore) {
        fetchMoreTransactions();
      }
    },
    [fetchMoreTransactions, hasMore],
  );

  useEffect(() => {
    const element = observerRef.current;

    const observer = new IntersectionObserver(handleObserver, {
      threshold: 1,
    });

    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [handleObserver]);

  useEffect(() => {
    if (isInitialFetch) {
      fetchTransactions(selectedTransferType, true);
    }
  }, [selectedTransferType, fetchTransactions, isInitialFetch]);

  return (
    <>
      <div className='mx-auto mb-[23px] flex flex-col justify-center gap-6 md:flex-row'>
        <div
          className='cursor-pointer'
          onClick={() => handleSelectTransfer(TransferType.RECEIVED)}
        >
          <MetricsCard
            title='Transfer Received'
            totalTransfers={totalTransferReceived}
            isPositive={true}
            percentageChange={8}
            isSelected={selectedTransferType === TransferType.RECEIVED}
          />
        </div>
        <div
          className='cursor-pointer'
          onClick={() => handleSelectTransfer(TransferType.SENT)}
        >
          <MetricsCard
            title='Transfer Sent'
            totalTransfers={totalTransferSent}
            isPositive={true}
            percentageChange={8}
            isSelected={selectedTransferType === TransferType.SENT}
          />
        </div>
      </div>

      <div className='mb-4 flex flex-col gap-2'>
        <Text as='span' size={TEXT_SIZE.SM}>
          Transfer Request{' '}
          {selectedTransferType === TransferType.RECEIVED ? 'Received' : 'Sent'}
        </Text>
        <Text size={TEXT_SIZE.XS} className='font-normal'>
          Manage your transfer by approving, declining request
        </Text>
      </div>

      <TransferTable
        transactions={transactions}
        transferType={selectedTransferType}
        isFetchingMore={hasMore}
      />
      {hasMore && (
        <div
          className='mt-8 flex items-center justify-center text-center'
          ref={observerRef}
        >
          <Spinner color='success' size='sm' />
        </div>
      )}
    </>
  );
};
