'use client';

// Libs
import dynamic from 'next/dynamic';
import { Card, cn } from '@nextui-org/react';
import { ApexOptions } from 'apexcharts';

// Constants
import { TITLES } from '@/constants';

// Interfaces
import { ChartProps } from '@/interfaces';

// Themes
import { colors } from '@/themes';

// Utils
import { getDownloadIcon } from '@/utils';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

export const SpendingStatistics = ({
  series,
  categories,
  customOptions = {},
  className = '',
}: ChartProps) => {
  const defaultOptions: ApexOptions = {
    chart: {
      type: 'line',
      toolbar: {
        tools: {
          download: getDownloadIcon(),
        },
      },
      zoom: {
        enabled: false,
      },
    },
    grid: {
      show: false,
    },
    legend: {
      show: false,
    },
    colors: [colors.java, colors.navyBlue],
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'straight',
      width: 2,
    },
    markers: {
      size: 6,
      strokeColors: 'transparent',
    },
    title: {
      text: TITLES.SPENDING_STATISTICS_CHART,
      align: 'left',
      style: {
        fontSize: '12',
        fontWeight: 'medium',
        color: colors.black,
      },
    },
    tooltip: {
      enabled: true,
    },
    xaxis: {
      categories: categories,
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      stepSize: 25,
      axisBorder: {
        show: true,
      },
    },
  };

  // Merge customOptions with defaultOptions
  const options = { ...defaultOptions, ...customOptions };

  return (
    <Card className={cn('w-full rounded-md bg-background-500 p-4', className)}>
      <Chart options={options} series={series} type='line' />
    </Card>
  );
};
