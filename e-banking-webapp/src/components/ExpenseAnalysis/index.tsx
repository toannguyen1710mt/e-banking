'use client';

import { Card, CardHeader, cn } from '@nextui-org/react';
import { ApexOptions } from 'apexcharts';
import dynamic from 'next/dynamic';

// Constants
import { EXPENSE_LABEL_DATA, EXPENSE_COLOR_CLASSES } from '@/constants';

// Interfaces
import { TEXT_VARIANT } from '@/interfaces';

// Components
import { Text } from '../common';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

interface ExpenseAnalysisProps {
  series: number[];
  options: ApexOptions;
}

export const ExpenseAnalysis = ({ options, series }: ExpenseAnalysisProps) => (
  <Card className='max-w-[250px] bg-background-300 p-[10px]'>
    <CardHeader className='p-0'>
      <Text variant={TEXT_VARIANT.TERTIARY}>Expense Analysis</Text>
    </CardHeader>
    <div className='mt-2 flex gap-4'>
      <Chart
        options={options}
        series={series}
        type='donut'
        width='69'
        height='69'
      />
      <div className='grid grid-cols-2 content-center gap-x-5 gap-y-3'>
        {EXPENSE_LABEL_DATA.map((label, index) => (
          <div key={index} className='flex h-3 items-center gap-[5px]'>
            <div
              className={cn(
                'h-[8px] w-[8px] rounded-full',
                EXPENSE_COLOR_CLASSES[index],
              )}
            ></div>
            <Text className='text-2xs text-white opacity-50'>{label}</Text>
          </div>
        ))}
      </div>
    </div>
  </Card>
);
