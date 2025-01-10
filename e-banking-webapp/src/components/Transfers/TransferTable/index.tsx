'use client';

// Constants
import {
  ERROR_MESSAGES,
  TRANSFER_RECEIVED_TABLE_COLUMNS,
  TRANSFER_SENT_TABLE_COLUMNS,
} from '@/constants';

// Interfaces
import { ITransaction, TransferType } from '@/interfaces';

// Components
import { Table } from '@/components';

// Utils
import { formatDate, formatNumberWithCommas } from '@/utils';

interface ITransferTableProps {
  transactions: ITransaction[];
  transferType: TransferType;
  isFetchingMore: boolean;
}

export const TransferTable = ({
  transactions,
  transferType,
  isFetchingMore,
}: ITransferTableProps) => {
  const isTransferReceived = transferType === TransferType.RECEIVED;

  const transferTableColumns = isTransferReceived
    ? TRANSFER_RECEIVED_TABLE_COLUMNS
    : TRANSFER_SENT_TABLE_COLUMNS;

  const columns = transferTableColumns.map((column) => {
    switch (column.key) {
      case 'createdAt':
        column.renderCell = (item) => <>{formatDate(item.createdAt)}</>;
        break;
      case 'status':
        column.renderCell = (item) => (
          <>{item.statusTransaction ? 'Approved' : 'Declined'}</>
        );
        break;
      case 'amount':
        column.renderCell = (item) => (
          <>
            {item.currencyUnit ?? '$'}
            {formatNumberWithCommas(item.amount)}
          </>
        );
        break;
      default:
        column.renderCell = null;
        break;
    }
    return column;
  });

  return (
    <Table
      columns={columns}
      data={transactions}
      emptyContent={!isFetchingMore ? ERROR_MESSAGES.EMPTY_DATA : ''}
      removeWrapper
      radius='none'
      isHeaderSticky={true}
      classNames={{
        base: 'max-h-[672px] overflow-y-auto [&::-webkit-scrollbar]:w-0',
        tbody:
          'divide-y divide-semiTransparentNavyBlue border-[0.2px] border-semiTransparentNavyBlue ',
        thead:
          '[&>tr]:first:rounded-none [&>tr:last-child]:hidden bg-background-900',
        th: 'last:rounded-none first:rounded-none text-primary-200 font-semibold',
      }}
    />
  );
};
