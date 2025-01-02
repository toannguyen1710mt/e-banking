'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { Session } from 'next-auth';
import { Spinner } from '@nextui-org/react';

// Interfaces
import { IAccount, ITransaction, TEXT_SIZE, TransferType } from '@/interfaces';

// Components
import { MetricsCard, Text, TransferTable } from '@/components';

// Services
import { getAccountsByUserId, getTransactions } from '@/services';

interface ITransferManagerProps {
  totalTransfersSent: number;
  totalTransfersReceived: number;
  session: Session;
}

export const TransferManager = ({
  totalTransfersSent,
  totalTransfersReceived,
  session,
}: ITransferManagerProps) => {
  const [selectedTransferType, setSelectedTransferType] = useState<
    TransferType.RECEIVED | TransferType.SENT
  >(TransferType.RECEIVED);
  const [transactions, setTransactions] = useState<ITransaction[]>([]);
  const [accounts, setAccounts] = useState<IAccount[]>([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isInitialFetch, setIsInitialFetch] = useState(true);

  const observerRef = useRef<HTMLDivElement>(null);

  const handleSelectReceived = () => {
    setSelectedTransferType(TransferType.RECEIVED);
    setIsInitialFetch(true);
    setHasMore(true);
  };

  const handleSelectSent = () => {
    setSelectedTransferType(TransferType.SENT);
    setIsInitialFetch(true);
    setHasMore(true);
  };

  useEffect(() => {
    const fetchAccountsByUserId = async () => {
      const accounts = await getAccountsByUserId(session.user.id);
      setAccounts(accounts);
    };

    fetchAccountsByUserId();
  }, [session.user.id]);

  const fetchTransactions = useCallback(
    async (transferType: TransferType, isInitialFetch: boolean) => {
      const nextPage = isInitialFetch ? 1 : currentPage + 1;

      const documentIds = accounts.map((account) => account.documentId);

      const filters =
        transferType === TransferType.RECEIVED
          ? { toAccountId: { $in: documentIds } }
          : { toAccountId: { $notIn: documentIds } };

      const { data: transaction, meta } = await getTransactions({
        filters,
        sort: 'createdAt',
        order: 'desc',
        pagination: { page: nextPage },
      });

      setTransactions((prev) =>
        isInitialFetch ? transaction : [...prev, ...transaction],
      );
      setCurrentPage(nextPage);
      setIsInitialFetch(false);

      if (meta.pagination.page >= meta.pagination.pageCount) {
        setHasMore(false);
      }
    },
    [accounts, currentPage],
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
      <div className='mb-[23px] ml-[50px] flex justify-center gap-6'>
        <div className='cursor-pointer' onClick={handleSelectReceived}>
          <MetricsCard
            title='Transfer Received'
            totalTransfers={totalTransfersReceived}
            isPositive={true}
            percentageChange={8}
            isSelected={selectedTransferType === TransferType.RECEIVED}
          />
        </div>
        <div className='cursor-pointer' onClick={handleSelectSent}>
          <MetricsCard
            title='Transfer Sent'
            totalTransfers={totalTransfersSent}
            isPositive={true}
            percentageChange={8}
            isSelected={selectedTransferType === TransferType.SENT}
          />
        </div>
      </div>

      <div className='mb-4 flex flex-col gap-2'>
        <Text as='h4' size={TEXT_SIZE.SM}>
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
