'use client';

// Constants
import { TRANSACTION_TABLE_COLUMNS } from '@/constants';

// Interfaces
import { ITransaction } from '@/interfaces';

// Components
import { Button, MoreVerticalIcon, Table } from '@/components';

// Utils
import { formatDate, formatNumberWithCommas } from '@/utils';

interface ITransactionTableProps {
  transactions: ITransaction[];
}

export const TransactionTable = ({ transactions }: ITransactionTableProps) => {
  const columns = TRANSACTION_TABLE_COLUMNS.map((column) => {
    switch (column.key) {
      case 'createdAt':
        column.renderCell = (item) => <>{formatDate(item.createdAt)}</>;
        break;
      case 'status':
        column.renderCell = (item) => (
          <span>{item.statusTransaction ? 'Success' : 'Failed'}</span>
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
      case 'action':
        column.renderCell = () => (
          <Button
            className='h-full !max-h-none min-w-0 !bg-transparent'
            isIconOnly
            isDisabled
          >
            <MoreVerticalIcon />
          </Button>
        );
        break;
      default:
        break;
    }
    return column;
  });

  return <Table columns={columns} data={transactions} />;
};
