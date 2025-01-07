'use client';

import { useState } from 'react';

// Interfaces
import { ITransaction, TEXT_SIZE, TransferType } from '@/interfaces';

// Components
import { MetricsCard, Text, TransferTable } from '@/components';

interface ITransferManagerProps {
  totalTransferReceived: number;
  totalTransferSent: number;
  transactionsReceived: ITransaction[];
  transactionsSent: ITransaction[];
}

export const TransferManager = ({
  totalTransferReceived,
  totalTransferSent,
  transactionsReceived,
  transactionsSent,
}: ITransferManagerProps) => {
  const [selectedTransferType, setSelectedTransferType] = useState<
    TransferType.RECEIVED | TransferType.SENT
  >(TransferType.RECEIVED);

  const handleSelectReceived = () => {
    setSelectedTransferType(TransferType.RECEIVED);
  };

  const handleSelectSent = () => {
    setSelectedTransferType(TransferType.SENT);
  };

  return (
    <>
      <div className='mb-[23px] ml-[50px] flex justify-center gap-6'>
        <div className='cursor-pointer' onClick={handleSelectReceived}>
          <MetricsCard
            title='Transfer Received'
            totalTransfers={totalTransferReceived}
            isPositive={true}
            percentageChange={8}
            isSelected={selectedTransferType === TransferType.RECEIVED}
          />
        </div>
        <div className='cursor-pointer' onClick={handleSelectSent}>
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
        <Text as='h4' size={TEXT_SIZE.SM}>
          Transfer Request{' '}
          {selectedTransferType === TransferType.RECEIVED ? 'Received' : 'Sent'}
        </Text>
        <Text size={TEXT_SIZE.XS} className='font-normal'>
          Manage your transfer by approving, declining request
        </Text>
      </div>

      <TransferTable
        transactions={
          selectedTransferType === TransferType.RECEIVED
            ? transactionsReceived
            : transactionsSent
        }
        transferType={selectedTransferType}
      />
    </>
  );
};
