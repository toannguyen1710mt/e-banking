// Libs
import { revalidateTag } from 'next/cache';

// Constants
import { API_ENDPOINTS } from '@/constants';

// Interfaces
import { AccountType, CurrencyUnit, TransactionCreateData } from '@/interfaces';

// Services
import { httpClient } from '@/services';

// Actions
import { createTransaction } from '@/actions/transaction';

jest.mock('next/cache', () => ({
  revalidateTag: jest.fn(),
}));

jest.mock('@/services', () => ({
  httpClient: {
    post: jest.fn(),
  },
}));

describe('createTransaction', () => {
  it('should create a new transaction item', async () => {
    // Mock input data
    const accountId = 'testAccountId';
    const transactionData: TransactionCreateData = {
      fromAccountId: 'sourceAccountId',
      toAccountId: 'destinationAccountId',
      amount: 100,
      statusTransaction: true,
      currencyUnit: '$' as CurrencyUnit,
      fromAccountType: 'Checking' as AccountType,
      toAccountType: 'Savings' as AccountType,
      recipientName: 'John Doe',
    };

    (httpClient.post as jest.Mock).mockResolvedValueOnce({ data: {} });

    await createTransaction(accountId, transactionData);

    expect(httpClient.post).toHaveBeenCalledWith(API_ENDPOINTS.TRANSACTIONS, {
      data: {
        ...transactionData,
        account: {
          connect: [accountId],
        },
      },
    });

    expect(revalidateTag).toHaveBeenCalledWith(API_ENDPOINTS.TRANSACTIONS);
  });
});
