'use client';

// Libs
import dynamic from 'next/dynamic';
import { Card, cn } from '@nextui-org/react';
import { ApexOptions } from 'apexcharts';

// Constants
import { TITLES } from '@/constants';

// Interface
import { ChartProps } from '@/interfaces';

// Themes
import { colors } from '@/themes';

// Utils
import { getDownloadIcon } from '@/utils';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

export const BalanceStatistics = ({
  series,
  categories,
  customOptions = {},
  className = '',
}: ChartProps) => {
  // Get data & colors from series
  const maxSeriesData = series[0].data.map((value1, index) => {
    const value2 = series[1].data[index];
    return value1 >= value2
      ? { value: value1, color: colors.java }
      : { value: value2, color: colors.navyBlue };
  });

  // Pick data from higher category
  const maxSeries = [
    {
      data: maxSeriesData.map((item) => item.value),
    },
  ];

  // Pick color from higher category
  const columnColors = maxSeriesData.map((item) => item.color);

  const defaultOptions: ApexOptions = {
    chart: {
      type: 'bar',
      toolbar: {
        tools: {
          download: getDownloadIcon(),
        },
      },
      zoom: {
        enabled: false,
      },
    },
    plotOptions: {
      bar: {
        distributed: true,
      },
    },
    grid: {
      show: false,
    },
    legend: {
      show: false,
    },
    colors: columnColors,
    dataLabels: {
      enabled: false,
    },
    markers: {
      size: 6,
      strokeColors: 'transparent',
    },
    title: {
      text: TITLES.BALANCE_STATISTICS_CHART,
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
      stepSize: 100,
      axisBorder: {
        show: true,
      },
    },
  };

  // Merge customOptions with defaultOptions
  const options = { ...defaultOptions, ...customOptions };

  return (
    <Card
      className={cn('rounded-md bg-background-500 p-4 shadow-none', className)}
    >
      <Chart options={options} series={maxSeries} type='bar' />
    </Card>
  );
};
