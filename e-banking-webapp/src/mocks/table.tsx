// Interfaces
import { Column, ITransaction } from '@/interfaces';

// Components
import { Chip, MoreVerticalIcon } from '@/components';

export const MOCK_COLUMNS: Column<ITransaction>[] = [
  { key: 'transactionId', title: 'Transaction ID' },
  { key: 'transactionDate', title: 'Transaction Date' },
  {
    key: 'status',
    title: 'Status',
    renderCell: (item: ITransaction) => (
      <Chip color={item.statusTransaction ? 'success' : 'danger'}>
        {item.statusTransaction ? 'Success' : 'Failed'}
      </Chip>
    ),
  },
  {
    key: 'amount',
    title: 'Amount',
    renderCell: (item: ITransaction) => (
      <>
        {item.currencyUnit} {item.amount}
      </>
    ),
  },
  {
    key: 'action',
    title: <MoreVerticalIcon />,
  },
];
