import { Card, CardBody, CardHeader } from '@nextui-org/react';

// Components
import { Text } from '@/components';
import { TransferManager } from '../TransferManager';

export const ActionCenter = () => (
  <Card className='gap-6 py-5 pl-5 pr-[38px]'>
    <CardHeader className='flex-col items-start gap-6 p-0'>
      <Text as='span'>Action Center</Text>
    </CardHeader>

    <CardBody>
      <TransferManager
        transactions={[]}
        totalTransfersSent={0}
        totalTransfersReceived={0}
      />
    </CardBody>
  </Card>
);
