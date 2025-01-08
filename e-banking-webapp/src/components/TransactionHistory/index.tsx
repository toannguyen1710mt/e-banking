'use client';

// Libs
import { Card, CardBody, CardHeader } from '@nextui-org/react';

// Interfaces
import { ITransaction, TEXT_SIZE, TEXT_VARIANT } from '@/interfaces';

// Constants
import { TRANSACTION_TABLE_COLUMNS } from '@/constants';

// Utils
import { formatDate, formatNumberWithCommas } from '@/utils';

// Components
import { Pagination, StatusIndicator, Table, Text } from '@/components';

interface ITransactionHistory {
  currentPage: number;
  totalPage: number;
  totalTransaction: number;
  transactions: ITransaction[];
}

export const TransactionHistory = ({
  currentPage,
  totalPage,
  totalTransaction,
  transactions,
}: ITransactionHistory) => {
  const columns = TRANSACTION_TABLE_COLUMNS.map((column) => {
    switch (column.key) {
      case 'createdAt':
        column.renderCell = (item) => <>{formatDate(item.createdAt)}</>;
        break;
      case 'to':
        column.renderCell = (item) => (
          <>{item.recipientName || item.toAccountType}</>
        );
        break;
      case 'status':
        column.renderCell = (item) => (
          <div
            className={`flex items-center gap-[4px] ${item.statusTransaction ? 'text-success' : 'text-danger'}`}
          >
            <StatusIndicator />
            <Text variant={TEXT_VARIANT.DEFAULT} size={TEXT_SIZE['2XS']}>
              {item.statusTransaction ? 'Success' : 'Failed'}
            </Text>
          </div>
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
    <Card className='grow gap-5 rounded-md p-4'>
      <CardHeader className='flex flex-col items-start gap-1 p-0'>
        <Text size={TEXT_SIZE.SM} className='font-semibold !text-navyBlue'>
          Transaction History ({totalTransaction})
        </Text>
        <Text size={TEXT_SIZE.XS} className='font-normal !text-neutralGray'>
          See history of your transaction
        </Text>
      </CardHeader>

      <CardBody className='flex flex-col p-0'>
        <Table
          classNames={{
            base: 'overflow-hidden py-2',
            table:
              'border-separate border-spacing-0 rounded-lg border-[0.2px] border-semiTransparentNavyBlue',
            thead: '[&>tr:last-child]:hidden',
            th: 'text-primary-200 font-semibold border-semiTransparentNavyBlue first:rounded-bl-none last:rounded-br-none',
            td: 'font-light text-2xs border-t-[0.2px] border-semiTransparentNavyBlue',
          }}
          columns={columns}
          data={transactions}
          removeWrapper
          bottomContent={
            <Pagination currentPage={currentPage} totalPage={totalPage} />
          }
        />
      </CardBody>
    </Card>
  );
};
