'use client';

// Libs
import { Card, CardBody, CardHeader } from '@nextui-org/react';
import { getLocalTimeZone, today } from '@internationalized/date';

// Component
import {
  Calendar,
  Text,
  DueTile,
  AmazonIcon,
  CarIcon,
  HomeIcon,
  WifiRouterIcon,
} from '@/components';

export const DUE_TILE = [
  {
    icon: <HomeIcon />,
    title: 'Pay Rent',
    createAt: 'Aug 21 at 3:00 pm',
  },
  {
    icon: <CarIcon />,
    title: 'New Car Target Payment',
    createAt: 'Aug 21 at 3:00 pm',
  },
  {
    icon: <WifiRouterIcon />,
    title: 'Wifi Subscription',
    createAt: 'Aug 21 at 3:00 pm',
  },
  {
    icon: <AmazonIcon />,
    title: 'Pay Amazon Prime',
    createAt: 'Aug 21 at 3:00 pm',
  },
];

export const MyCalender = () => (
  <Card className='h-full w-full gap-6 p-4 sm:flex-row lg:flex-col' radius='sm'>
    <CardHeader className='w-auto flex-col gap-6 p-0 sm:basis-1/2 lg:basis-0'>
      <Text
        as='span'
        className='w-full text-left text-xs font-medium !text-black'
      >
        My Calendar
      </Text>
      <Calendar
        value={today(getLocalTimeZone())}
        classNames={{ cell: 'p-0' }}
      />
    </CardHeader>
    <CardBody className='gap-5 p-0 sm:basis-1/2 lg:basis-0'>
      <Text as='span' className='text-lg font-bold !text-black'>
        Due This Month
      </Text>
      <div className='flex flex-col gap-4'>
        {DUE_TILE.map(({ icon, title, createAt }, index) => (
          <DueTile key={index} icon={icon} title={title} createAt={createAt} />
        ))}
      </div>
    </CardBody>
  </Card>
);
