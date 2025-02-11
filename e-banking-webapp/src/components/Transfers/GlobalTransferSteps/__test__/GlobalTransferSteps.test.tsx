// Libs
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

// Componennts
import { GlobalTransferSteps } from '@/components';

// Mocks
import { MOCK_SESSION_DATA } from '@/mocks';

// Actions
import { createTransaction, updateAccountInfo } from '@/actions';

jest.mock('@/actions', () => ({
  createTransaction: jest.fn(),
  updateAccountInfo: jest.fn(),
}));

const selectDropdownOption = (labelText: string, optionName: string): void => {
  const dropdown = screen.getByLabelText(labelText);

  fireEvent.click(dropdown);

  const option = screen.getByRole('option', {
    name: new RegExp(optionName, 'i'),
  });
  fireEvent.click(option);
};

const fillInput = (labelText: string, value: string): void => {
  const input = screen.getByLabelText(labelText);

  fireEvent.change(input, { target: { value } });
};

describe('GlobalTransferSteps component', () => {
  let container: ReturnType<typeof render>;

  beforeEach(() => {
    container = render(
      <GlobalTransferSteps session={MOCK_SESSION_DATA} onClose={jest.fn()} />,
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should match snapshot', () => {
    expect(container).toMatchSnapshot();
  });

  test('should handle successful transaction', async () => {
    selectDropdownOption('country', 'South Africa');
    selectDropdownOption('account', 'Main Account');
    fillInput('recipient account', '123456789012');
    fillInput('amount', '1000');

    const transferButton = screen.getByLabelText('transfer funds');

    fireEvent.click(transferButton);
    const proceedButton = screen.getByRole('button', {
      name: /Proceed/i,
    });

    fireEvent.click(proceedButton);
    await waitFor(() => {
      expect(createTransaction).toHaveBeenCalled();
      expect(updateAccountInfo).toHaveBeenCalledTimes(1);
    });
  });

  test('should handle toast when transaction fails', async () => {
    (createTransaction as jest.Mock).mockRejectedValueOnce(
      new Error('Transfer failed'),
    );

    selectDropdownOption('country', 'South Africa');
    selectDropdownOption('account', 'Main Account');
    fillInput('recipient account', '123456789012');
    fillInput('amount', '1000');

    const transferButton = screen.getByLabelText('transfer funds');

    fireEvent.click(transferButton);
    const proceedButton = screen.getByRole('button', {
      name: /Proceed/i,
    });

    fireEvent.click(proceedButton);
    await waitFor(() => {
      expect(createTransaction).toHaveBeenCalled();
    });

    expect(proceedButton).toBeInTheDocument();
  });
});
