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
        base: cn('rounded-lg', classNames?.base),
        headerWrapper: cn(
          'bg-background-300 py-0 gap-0',
          classNames?.headerWrapper,
        ),
        header: cn('order-1 justify-start', classNames?.header),
        title: cn('text-xs text-foreground-200 font-normal', classNames?.title),
        prevButton: cn(
          'order-2 text-foreground-200',
          'data-[hover=true]:bg-secondary-300',
          classNames?.prevButton,
        ),
        nextButton: cn(
          'translate-x-3 text-foreground-200',
          'data-[hover=true]:bg-secondary-300',
          classNames?.nextButton,
        ),
        gridWrapper: cn('bg-background-300', classNames?.gridWrapper),
        gridHeaderRow: cn(
          'bg-background-300 pb-0 justify-between px-1 pt-2',
          classNames?.gridHeaderRow,
        ),
        gridHeaderCell: cn(
          'text-2xs text-foreground-200 font-normal',
          classNames?.gridHeaderCell,
        ),
        gridBodyRow: cn('justify-between px-1', classNames?.gridBodyRow),
        cellButton: cn(
          'text-2xs text-foreground-200 ',
          'data-[hover=true]:!bg-secondary-300 data-[hover=true]:text-foreground-200 data-[selected=true]:border data-[selected=true]:border-secondary-300 data-[selected=true]:bg-background-300',
          classNames?.cellButton,
        ),
      }}
    />
  );
};
