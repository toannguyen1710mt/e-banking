'use client';

// Libs
import {
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Skeleton,
} from '@nextui-org/react';

// Components
import { CustomTable } from '@/components';

// Interfaces
import { Column } from '@/interfaces';

interface ISkeletonTableProps<T> {
  columns: Column<T>[];
  numberOfRows?: number;
}

export const SkeletonTable = <T,>({
  columns,
  numberOfRows = 10,
}: ISkeletonTableProps<T>) => {
  return (
    <CustomTable aria-label='Skeleton Table'>
      <TableHeader>
        {columns.map((column) => (
          <TableColumn key={column.key}>{column.title}</TableColumn>
        ))}
      </TableHeader>
      <TableBody>
        {Array.from({ length: numberOfRows }).map((_, rowIndex) => (
          <TableRow key={rowIndex}>
            {columns.map((column) => (
              <TableCell key={column.key}>
                <Skeleton className='h-4 w-3/5 rounded-full' />
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </CustomTable>
  );
};
