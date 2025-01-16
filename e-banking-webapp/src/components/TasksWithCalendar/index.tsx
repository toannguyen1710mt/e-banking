'use client';

// Libs
import { Card, CardBody, CardHeader, DateValue } from '@nextui-org/react';
import { useState } from 'react';

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

export const TasksWithCalendar = () => {
  const [dateSelect, setDateSelect] = useState<DateValue | unknown>(null);

  const changeDate = (date: DateValue) => {
    setDateSelect(date);
  };

  return (
    <Card className='h-full w-full py-[14px] pl-[14px] pr-6' radius='sm'>
      <CardHeader className='flex-col gap-6'>
        <Text
          as='span'
          className='w-full text-left text-xs font-medium !text-black'
        >
          My Calendar
        </Text>
        <Calendar
          classNames={{ base: 'ml-[11px]' }}
          value={dateSelect as DateValue}
          onChange={changeDate}
        />
      </CardHeader>
      <CardBody className='gap-5'>
        <Text as='span' className='text-lg font-bold !text-black'>
          Due This Month
        </Text>
        <div className='flex flex-col gap-4'>
          {DUE_TILE.map(({ icon, title, createAt }, index) => (
            <DueTile
              key={index}
              icon={icon}
              title={title}
              createAt={createAt}
            />
          ))}
        </div>
      </CardBody>
    </Card>
  );
};
