import { Card, CardBody, CardHeader } from '@nextui-org/react';
import { Session } from 'next-auth';

// Components
import { Text } from '@/components';
import { TransferManager } from '../TransferManager';
import { getTotalTransferReceived, getTotalTransferSent } from '@/services';

interface IActionCenterProps {
  session: Session;
}

export const ActionCenter = async ({ session }: IActionCenterProps) => {
  const totalTransferSent = await getTotalTransferSent(session.user.id);
  const totalTransfersReceived = await getTotalTransferReceived(
    session.user.id,
  );

  return (
    <Card className='h-full gap-6 py-5 pl-5 pr-[38px]'>
      <CardHeader className='flex-col items-start gap-6 p-0'>
        <Text as='span'>Action Center</Text>
      </CardHeader>

      <CardBody>
        <TransferManager
          totalTransfersSent={totalTransferSent}
          totalTransfersReceived={totalTransfersReceived}
          session={session}
        />
      </CardBody>
    </Card>
  );
};
