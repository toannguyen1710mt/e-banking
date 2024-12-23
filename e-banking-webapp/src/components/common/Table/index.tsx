'use client';

// Libs
import {
  extendVariants,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Table as TableNextUI,
  cn,
} from '@nextui-org/react';

// Constants
import { ERROR_MESSAGES } from '@/constants/messages';

// Interfaces
import { TableProps } from '@/interfaces';

export const CustomTable = extendVariants(TableNextUI, {
  variants: {
    styles: {
      default: {
        wrapper: 'rounded-md shadow-md p-0 px-3',
        th: cn('text-xs text-foreground-100 font-medium', 'opacity-50'),
        td: cn('px-4 py-4 text-xs text-foreground-100', 'font-medium'),
      },
    },
  },
  defaultVariants: {
    styles: 'default',
  },
});

export const Table = <T,>({
  columns,
  data,
  emptyContent = ERROR_MESSAGES.EMPTY_DATA,
  ...tableProps
}: TableProps<T>) => {
  return (
    <CustomTable {...{ tableProps }}>
      <TableHeader>
        {columns.map((column) => (
          <TableColumn key={column.key}>{column.title}</TableColumn>
        ))}
      </TableHeader>
      <TableBody emptyContent={emptyContent}>
        {data.map((item, rowIndex) => (
          <TableRow key={rowIndex}>
            {columns.map((column) => (
              <TableCell key={column.key}>
                {column.renderCell
                  ? column.renderCell(item)
                  : (item[column.key as keyof T] as string)}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </CustomTable>
  );
};
