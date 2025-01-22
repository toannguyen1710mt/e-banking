// Libs
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

// Components
import { InternalTransferSteps } from '@/components';

// Mocks
import { MOCK_SESSION_DATA } from '@/mocks';

// Contexts
import { ToastProvider } from '@/context/ToastContext';

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

describe('InternalTransferSteps component', () => {
  let container: ReturnType<typeof render>;

  beforeEach(() => {
    container = render(
      <ToastProvider>
        <InternalTransferSteps
          session={MOCK_SESSION_DATA}
          onClose={jest.fn()}
        />
      </ToastProvider>,
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should match snapshot', () => {
    expect(container).toMatchSnapshot();
  });

  it('should handle successful transaction', async () => {
    selectDropdownOption('from account', 'main account');
    selectDropdownOption('to account', 'savings');
    fillInput('amount', '100');

    const transferButton = screen.getByLabelText('transfer funds');
    fireEvent.click(transferButton);

    const proceedButton = screen.getByRole('button', {
      name: /Proceed/i,
    });
    fireEvent.click(proceedButton);

    await waitFor(() => {
      expect(createTransaction).toHaveBeenCalled();
      expect(updateAccountInfo).toHaveBeenCalledTimes(2);
    });
  });

  it('should handle toast when transaction fails', async () => {
    (createTransaction as jest.Mock).mockRejectedValueOnce(
      new Error('Transfer failed'),
    );

    selectDropdownOption('from account', 'main account');
    selectDropdownOption('to account', 'savings');
    fillInput('amount', '100');

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
