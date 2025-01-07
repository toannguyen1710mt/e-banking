import { Card, CardBody, CardHeader } from '@nextui-org/react';

// Interfaces
import { ITransaction } from '@/interfaces';

// Components
import { Text } from '@/components';
import { TransferManager } from '../TransferManager';

interface IActionCenterProps {
  totalTransferReceived: number;
  totalTransferSent: number;
  transactionsReceived: ITransaction[];
  transactionsSent: ITransaction[];
}

export const ActionCenter = ({
  totalTransferReceived,
  totalTransferSent,
  transactionsReceived,
  transactionsSent,
}: IActionCenterProps) => {
  return (
    <Card className='h-full gap-6 py-5 pl-5 pr-[38px]'>
      <CardHeader className='flex-col items-start gap-6 p-0'>
        <Text as='span'>Action Center</Text>
      </CardHeader>
      <CardBody>
        <TransferManager
          totalTransferSent={totalTransferSent}
          totalTransferReceived={totalTransferReceived}
          transactionsReceived={transactionsReceived}
          transactionsSent={transactionsSent}
        />
      </CardBody>
    </Card>
  );
};
