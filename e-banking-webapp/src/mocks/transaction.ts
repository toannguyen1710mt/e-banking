// Interfaces
import { ITransaction } from '@/interfaces';

// Utils
import { formatDate } from '@/utils';

export const MOCK_TRANSACTIONS: ITransaction[] = [
  {
    id: 'TX12345',
    documentId: 'DOC1001',
    currencyUnit: '$',
    fromAccountId: 'CARD001',
    toAccountId: 'CARD002',
    amount: 120,
    statusTransaction: true,
    createdAt: formatDate('2024-12-01'),
    updatedAt: formatDate('2024-12-01'),
    publishedAt: formatDate('2024-12-01'),
  },
  {
    id: 'TX12346',
    documentId: 'DOC1002',
    currencyUnit: '$',
    fromAccountId: 'CARD003',
    toAccountId: 'CARD004',
    amount: 75,
    statusTransaction: false,
    createdAt: formatDate('2024-12-02'),
    updatedAt: formatDate('2024-12-02'),
    publishedAt: formatDate('2024-12-02'),
  },
  {
    id: 'TX12347',
    documentId: 'DOC1003',
    currencyUnit: '$',
    fromAccountId: 'CARD005',
    toAccountId: 'CARD006',
    amount: 50,
    statusTransaction: false,
    createdAt: formatDate('2024-12-03'),
    updatedAt: formatDate('2024-12-03'),
    publishedAt: formatDate('2024-12-03'),
  },
  {
    id: 'TX12348',
    documentId: 'DOC1004',
    currencyUnit: '$',
    fromAccountId: 'CARD007',
    toAccountId: 'CARD008',
    amount: 200,
    statusTransaction: true,
    createdAt: formatDate('2024-12-04'),
    updatedAt: formatDate('2024-12-04'),
    publishedAt: formatDate('2024-12-04'),
  },
];
