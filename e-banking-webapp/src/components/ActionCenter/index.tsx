'use client';

import { Card, CardBody, CardHeader } from '@nextui-org/react';
import { ReactNode, useState } from 'react';

// Interfaces
import { TransferType } from '@/interfaces';

// Components
import { MetricsCard, Text } from '@/components';

interface IActionCenter {
  table: ReactNode;
}

export const ActionCenter = ({ table }: IActionCenter) => {
  const [selectedTransferType, setSelectedTransferType] = useState<
    TransferType.RECEIVED | TransferType.SENT
  >(TransferType.RECEIVED);

  return (
    <Card className='gap-6 py-5 pl-5 pr-[38px]'>
      <CardHeader className='flex-col items-start gap-6 p-0'>
        <Text as='span'>Action Center</Text>
        <div className='ml-[50px] flex gap-6'>
          <div
            className='cursor-pointer'
            onClick={() => setSelectedTransferType(TransferType.RECEIVED)}
          >
            <MetricsCard
              // TODO: Props totalTransfers, percentageChange will get data from API
              title='Transfer Received'
              totalTransfers={54}
              isPositive={true}
              percentageChange={8}
              isSelected={selectedTransferType === TransferType.RECEIVED}
            />
          </div>
          <div
            className='cursor-pointer'
            onClick={() => setSelectedTransferType(TransferType.SENT)}
          >
            <MetricsCard
              // TODO: Props totalTransfers, percentageChange will get data from API
              title='Transfer Sent'
              totalTransfers={14}
              isPositive={true}
              percentageChange={8}
              isSelected={selectedTransferType === TransferType.SENT}
            />
          </div>
        </div>
      </CardHeader>
      <CardBody>
        {/* TODO: Will be passed in from the TransferTable component */}
        {table}
      </CardBody>
    </Card>
  );
};
