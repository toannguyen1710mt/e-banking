import { Card, CardBody, CardHeader } from '@nextui-org/react';
import { Session } from 'next-auth';

// Components
import { Text } from '@/components';
import { TransferManager } from '../TransferManager';

interface IActionCenterProps {
  session: Session;
  totalTransferSent: number;
  totalTransferReceived: number;
}

export const ActionCenter = ({
  session,
  totalTransferSent,
  totalTransferReceived,
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
          session={session}
        />
      </CardBody>
    </Card>
  );
};
