// Interfaces
import { Column, Status, ITransaction } from '@/interfaces';

// Components
import { Chip, MoreVerticalIcon } from '@/components';

export const MOCK_COLUMNS: Column<ITransaction>[] = [
  { key: 'transactionId', title: 'Transaction ID' },
  { key: 'transactionDate', title: 'Transaction Date' },
  {
    key: 'status',
    title: 'Status',
    renderCell: (item: ITransaction) => (
      <Chip
        text={item.status}
        bgColor={
          item.status === Status.SUCCESS ? 'bg-lightGreen' : 'bg-lightRed'
        }
        fontColor={item.status === Status.SUCCESS ? 'text-green' : 'text-red'}
        customClass='min-w-[80]'
      />
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
