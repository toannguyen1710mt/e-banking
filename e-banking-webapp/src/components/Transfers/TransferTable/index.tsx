'use client';

// Constants
import {
  TRANSFER_RECEIVED_TABLE_COLUMNS,
  TRANSFER_SENT_TABLE_COLUMNS,
} from '@/constants';

// Interfaces
import { ITransaction, TEXT_SIZE } from '@/interfaces';

// Components
import { Table, Text } from '@/components';

// Utils
import { formatNumberWithCommas } from '@/utils';

interface ITransferTableProps {
  transactions: ITransaction[];
  transferType: 'received' | 'sent';
}

export const TransferTable = ({
  transactions,
  transferType,
}: ITransferTableProps) => {
  const isTransferReceived = transferType === 'received';

  const transferTableTopContent = () => (
    <div className='flex flex-col gap-2'>
      <Text as='h4' size={TEXT_SIZE.SM}>
        Transfer Requqest {isTransferReceived ? 'Received' : 'Sent'}
      </Text>
      <Text size={TEXT_SIZE.XS} className='font-normal'>
        Manage your transfer by approving, decline request
      </Text>
    </div>
  );

  const transferTableColumns = isTransferReceived
    ? TRANSFER_RECEIVED_TABLE_COLUMNS
    : TRANSFER_SENT_TABLE_COLUMNS;

  const columns = transferTableColumns.map((column) => {
    switch (column.key) {
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
        break;
    }
    return column;
  });

  return (
    <Table
      topContent={transferTableTopContent()}
      columns={columns}
      data={transactions}
      removeWrapper
      radius='none'
      classNames={{
        tbody:
          'divide-y divide-semiTransparentNavyBlue border-[0.2px] border-semiTransparentNavyBlue ',
        th: 'last:rounded-none first:rounded-none text-primary-200 font-semibold',
        thead: 'translate-y-1',
      }}
    />
  );
};
