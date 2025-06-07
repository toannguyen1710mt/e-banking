// Libs
import { ReactNode } from 'react';
import { TableProps as TablePropsNextUI } from '@nextui-org/react';

export type Column<T> = {
  key: string;
  title: string | ReactNode;
  renderCell?: ((item: T) => ReactNode) | null;
};

export interface TableProps<T> extends TablePropsNextUI {
  columns: Column<T>[];
  data: T[];
  emptyContent?: string;
}
