'use client';

import { Card, CardBody, CardHeader } from '@nextui-org/react';
import { Text } from '../common';
import { MetricsCard } from '../MetricsCard';
import { TEXT_SIZE, TEXT_VARIANT } from '@/interfaces';

export const ActionCenter = () => {
  return (
    <Card className='gap-6 py-5 pl-5 pr-[38px]'>
      <CardHeader className='flex-col items-start gap-6 p-0'>
        <Text as='span'>Action Center</Text>
        <div className='ml-[50px] flex gap-6'>
          <MetricsCard
            title='Transfer Received'
            totalTransfers={54}
            isPositive={true}
            percentageChange={8}
          />
          <MetricsCard
            title='Transfer Sent'
            totalTransfers={14}
            isPositive={true}
            percentageChange={8}
          />
        </div>
      </CardHeader>
      <CardBody>
        <Text variant={TEXT_VARIANT.DEFAULT} size={TEXT_SIZE.SM} as='span'>
          Transfer Received
        </Text>
        <Text
          as='span'
          variant={TEXT_VARIANT.DEFAULT}
          size={TEXT_SIZE.XS}
          className='font-normal'
        >
          Manage your transfer by approving, decline request
        </Text>
      </CardBody>
    </Card>
  );
};
