'use client';

// Libs
import dynamic from 'next/dynamic';
import { Card, CardBody, CardFooter, CardHeader, cn } from '@nextui-org/react';
import { ApexOptions } from 'apexcharts';

// Constants
import { AVAILABLE_WALLETS, CARD_STATISTICS } from '@/constants';

// Interfaces
import { CardStatistics } from '@/interfaces';

// Components
import { Text } from '@/components';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

interface ExpenseAnalysisProps {
  series: number[];
  totalBalance: ApexOptions;
}

export const MasterCard = ({ totalBalance, series }: ExpenseAnalysisProps) => (
  <Card className='w-full min-w-[100px] bg-navyBlue px-4 pb-5 pt-[14px] md:min-w-[294px]'>
    <CardHeader className='p-0'>
      <Text as='span' className='text-base font-semibold text-white'>
        Monobank MasterCard
      </Text>
    </CardHeader>
    <CardBody className='gap-2 px-0 pb-0 pt-3'>
      <Text
        as='span'
        className='text-xs font-normal text-white max-[680px]:text-sm'
      >
        Available Wallets
      </Text>
      <ol className='flex gap-6 text-[10px] font-normal text-white max-[680px]:text-xs'>
        {Object.values(CardStatistics)
          .filter((wallet) => AVAILABLE_WALLETS.includes(wallet))
          .map((wallet, index) => (
            <li key={wallet}>
              {index + 1}. {wallet}
            </li>
          ))}
      </ol>
    </CardBody>
    <CardFooter className='flex-col items-start px-0 pb-0 pt-4'>
      <Text as='span' className='text-xs font-normal text-white underline'>
        Card Statistics
      </Text>
      <div className='md:max-0 mx-auto mt-2 flex max-w-[220px] flex-row items-center gap-9 md:max-w-full'>
        <Chart
          options={totalBalance}
          series={series}
          type='donut'
          width='100'
          height='100'
        />
        <div className='flex flex-col gap-3'>
          {CARD_STATISTICS.map(({ label, color }, index) => (
            <div key={index} className='flex items-center gap-1'>
              <div className={cn('h-[14px] w-[14px]', color)}></div>
              <Text
                as='span'
                className='text-[10px] font-normal text-white max-[680px]:text-xs'
              >
                {label}
              </Text>
            </div>
          ))}
        </div>
      </div>
    </CardFooter>
  </Card>
);
