'use client';

import { useState } from 'react';

// Interfaces
import { ITransaction, TransferType } from '@/interfaces';

// Components
import { MetricsCard, TransferTable } from '@/components';

interface ITransferManagerProps {
  totalTransfersSent: number;
  totalTransfersReceived: number;
  transactions: ITransaction[];
}

export const TransferManager = ({
  totalTransfersSent,
  totalTransfersReceived,
  transactions,
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
      <div className='mb-[23px] ml-[50px] flex gap-6'>
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

      <TransferTable
        transactions={transactions}
        transferType={selectedTransferType}
      />
    </>
  );
};
