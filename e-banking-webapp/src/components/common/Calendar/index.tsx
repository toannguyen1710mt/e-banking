'use client';

// Libs
import {
  Calendar as CalendarNextUI,
  CalendarProps,
  cn,
} from '@nextui-org/react';

// Components
import { Text } from '@/components';

export const Calendar = ({ classNames, ...rest }: CalendarProps) => {
  const {
    base,
    headerWrapper,
    header,
    title,
    prevButton,
    nextButton,
    gridWrapper,
    gridHeaderRow,
    gridHeaderCell,
    gridBodyRow,
    cellButton,
  } = classNames || {};

  return (
    <CalendarNextUI
      {...rest}
      topContent={
        <div className='bg-background-300 px-4 pt-2'>
          <Text as='h3' className='text-2xs font-normal !text-foreground-200'>
            Select date
          </Text>
        </div>
      }
      hideDisabledDates={true}
      showShadow={false}
      classNames={{
        base: cn('rounded-lg', base),
        headerWrapper: cn('bg-background-300 py-0 gap-0', headerWrapper),
        header: cn('order-1 justify-start', header),
        title: cn('text-xs text-foreground-200 font-normal', title),
        prevButton: cn(
          'order-2 text-foreground-200',
          'data-[hover=true]:bg-secondary-300',
          prevButton,
        ),
        nextButton: cn(
          'translate-x-3 text-foreground-200',
          'data-[hover=true]:bg-secondary-300',
          nextButton,
        ),
        gridWrapper: cn('bg-background-300', gridWrapper),
        gridHeaderRow: cn(
          'bg-background-300 pb-0 justify-between px-1 pt-2',
          gridHeaderRow,
        ),
        gridHeaderCell: cn(
          'text-2xs text-foreground-200 font-normal',
          gridHeaderCell,
        ),
        gridBodyRow: cn('justify-between px-1', gridBodyRow),
        cellButton: cn(
          'text-2xs text-foreground-200',
          'data-[hover=true]:!bg-secondary-300 data-[hover=true]:text-foreground-200 data-[selected=true]:border data-[selected=true]:border-secondary-300 data-[selected=true]:bg-background-300',
          cellButton,
        ),
      }}
    />
  );
};
