'use client';

// Libs
import { Card, CardBody, CardHeader } from '@nextui-org/react';

// Constants
import { DUE_TILE } from '@/constants';

// Component
import { Calendar, Text, DueTile } from '@/components';

export const MyCalender = () => (
  <Card className='h-full py-[14px] pl-[14px] pr-6' radius='sm'>
    <CardHeader className='flex-col items-start gap-6'>
      <Text as='span'>My Calender</Text>
      <Calendar classNames={{ base: 'ml-[11px]' }} />
    </CardHeader>
    <CardBody className='gap-5'>
      <Text>Due This Month</Text>
      <div className='flex flex-col gap-4'>
        {DUE_TILE.map(({ icon, title, createAt }, index) => (
          <DueTile key={index} icon={icon} title={title} createAt={createAt} />
        ))}
      </div>
    </CardBody>
  </Card>
);
