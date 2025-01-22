import { render } from '@testing-library/react';

// Services
import * as services from '@/services';

import { TransactionHistoryHome } from '..';
import { MOCK_TRANSACTIONS_HISTORY_HOME } from '@/mocks';

jest.mock('@/services', () => ({
  getTransactionsByUserId: jest.fn(),
}));

describe('TransactionHistoryHome component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Should render snapshot correctly.', () => {
    jest
      .spyOn(services, 'getTransactionsByUserId')
      .mockResolvedValue(MOCK_TRANSACTIONS_HISTORY_HOME);

    expect(render(<TransactionHistoryHome />)).toMatchSnapshot();
  });
});
