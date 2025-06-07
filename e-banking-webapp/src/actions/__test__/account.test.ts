// Libs
import { revalidateTag } from 'next/cache';

// Constants
import { API_ENDPOINTS } from '@/constants';

// Interfaces
import { AccountType, CurrencyUnit, IAccountPayloadData } from '@/interfaces';

// Services
import { httpClient } from '@/services';

// Actions
import { updateAccountInfo } from '@/actions/account';

jest.mock('next/cache', () => ({
  revalidateTag: jest.fn(),
}));

jest.mock('@/services', () => ({
  httpClient: {
    put: jest.fn(),
  },
}));

describe('updateAccountInfo', () => {
  it('should update information of an account', async () => {
    const accountDocumenttId = 'testAccountDocumentId';
    const accountData: IAccountPayloadData = {
      accountNumber: '0123456789',
      balance: 100000,
      type: 'Checking' as AccountType,
      currency: '$' as CurrencyUnit,
      name: 'John Doe',
    };

    (httpClient.put as jest.Mock).mockResolvedValueOnce({ data: {} });

    await updateAccountInfo(accountDocumenttId, accountData);

    expect(httpClient.put).toHaveBeenCalledWith(
      `${API_ENDPOINTS.ACCOUNTS}/${accountDocumenttId}`,
      {
        data: {
          ...accountData,
        },
      },
    );

    expect(revalidateTag).toHaveBeenCalledWith(API_ENDPOINTS.ACCOUNTS);
  });
});
