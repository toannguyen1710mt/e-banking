'use client';

import { useEffect, useState, useTransition } from 'react';
import { Session } from 'next-auth';

// Constants
import {
  TRANSFER_RECEIVED_TABLE_COLUMNS,
  TRANSFER_SENT_TABLE_COLUMNS,
} from '@/constants';

// Interfaces
import { ITransaction, TEXT_SIZE, TransferType } from '@/interfaces';

// Components
import { MetricsCard, SkeletonTable, Text, TransferTable } from '@/components';

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
  const [isFetchingTransactions, startTransition] = useTransition();

  const handleSelectReceived = () => {
    setSelectedTransferType(TransferType.RECEIVED);
  };

  const handleSelectSent = () => {
    setSelectedTransferType(TransferType.SENT);
  };

  useEffect(() => {
    startTransition(async () => {
      const accounts = await getAccountsByUserId(session.user.id);

      const documentIds = accounts.map((account) => account.documentId);

      const filters =
        selectedTransferType === TransferType.RECEIVED
          ? { toAccountId: { $in: documentIds } }
          : { toAccountId: { $notIn: documentIds } };

      const { data } = await getTransactions({
        filters,
        sort: 'createdAt',
        order: 'desc',
        pagination: { pageSize: 6 },
      });

      setTransactions(data);
    });
  }, [session.user.id, selectedTransferType]);

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
          Manage your transfer by approving, decline request
        </Text>
      </div>

      {isFetchingTransactions ? (
        <SkeletonTable
          columns={
            selectedTransferType === TransferType.RECEIVED
              ? TRANSFER_RECEIVED_TABLE_COLUMNS
              : TRANSFER_SENT_TABLE_COLUMNS
          }
          numberOfRows={6}
          removeWrapper
          radius='none'
          classNames={{
            tbody:
              'divide-y divide-semiTransparentNavyBlue border-[0.2px] border-semiTransparentNavyBlue ',
            th: 'last:rounded-none first:rounded-none text-primary-200 font-semibold',
            thead: 'translate-y-1',
          }}
        />
      ) : (
        <TransferTable
          transactions={transactions}
          transferType={selectedTransferType}
        />
      )}
    </>
  );
};
