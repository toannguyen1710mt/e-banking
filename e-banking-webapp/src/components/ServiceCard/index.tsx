// Libs
import { Card, CardBody, CardHeader } from '@nextui-org/react';
import { ReactNode } from 'react';

// Component
import { Text } from '@/components';

interface IServiceCard {
  icon: ReactNode;
  title: string;
  amount: number;
}

export const ServiceCard = ({ icon, title, amount }: IServiceCard) => (
  <Card className='w-40'>
    <CardHeader className='pb-0'>{icon}</CardHeader>
    <CardBody className='pb-6 pt-5'>
      <Text as='span' className='text-xs font-semibold'>
        {title}
      </Text>
      <div className='mt-2 flex gap-1 text-xs'>
        <Text as='span' className='font-medium'>
          Amount:
        </Text>
        <Text as='span' className='font-bold'>
          ${amount}
        </Text>
      </div>
      <Text
        as='span'
        className='mt-2 text-xs font-normal text-transparentBlack'
      >
        Charged Monthly
      </Text>
    </CardBody>
  </Card>
);
