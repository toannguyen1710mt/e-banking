// Libs
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

// context
import { useWizardFormContext } from '@/context';

// Component
import { ConfirmGlobalTransfer } from '@/components';

// Mock the `useWizardFormContext` hook
jest.mock('@/context', () => ({
  useWizardFormContext: jest.fn(),
}));

// Mock wizard context data
const mockWizardContext = {
  form: {
    getValues: jest.fn(() => ({
      globalTransfer: { fromAccountType: 'Savings' },
      recipientName: 'John Doe',
    })),
  },
  onPrevStep: jest.fn(),
  onNextStep: jest.fn(),
};

describe('ConfirmGlobalTransfer Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useWizardFormContext as jest.Mock).mockReturnValue(mockWizardContext);
  });

  it('renders the component with correct recipient and amount', () => {
    render(
      <ConfirmGlobalTransfer submitHandler={jest.fn()} amountInUSD='500.00' />,
    );

    expect(
      screen.getByText('John Doe is about to receive'),
    ).toBeInTheDocument();
    expect(screen.getByText('$500.00')).toBeInTheDocument();
    expect(
      screen.getByText(
        /From your Savings wallet to John Doe's wallet, this action cannot be undone once approved.../,
      ),
    ).toBeInTheDocument();
  });

  it('calls onPrevStep when the "Cancel" button is clicked', () => {
    render(
      <ConfirmGlobalTransfer submitHandler={jest.fn()} amountInUSD='500.00' />,
    );

    const cancelButton = screen.getByText('Cancel');
    fireEvent.click(cancelButton);

    expect(mockWizardContext.onPrevStep).toHaveBeenCalled();
  });

  it('calls submitHandler and onNextStep when "Proceed" is clicked', () => {
    const mockSubmitHandler = jest.fn();
    render(
      <ConfirmGlobalTransfer
        submitHandler={mockSubmitHandler}
        amountInUSD='500.00'
      />,
    );

    const proceedButton = screen.getByText('Proceed');
    fireEvent.click(proceedButton);

    expect(mockWizardContext.form.getValues).toHaveBeenCalled();
    expect(mockSubmitHandler).toHaveBeenCalledWith({
      globalTransfer: { fromAccountType: 'Savings' },
      recipientName: 'John Doe',
    });
    expect(mockWizardContext.onNextStep).toHaveBeenCalled();
  });

  it('disables buttons when isPending is true', () => {
    jest.spyOn(React, 'useTransition').mockReturnValue([true, jest.fn()]);

    render(
      <ConfirmGlobalTransfer submitHandler={jest.fn()} amountInUSD='500.00' />,
    );

    const cancelButton = screen.getByText('Cancel');
    const proceedButton = screen.getByText('Proceed');

    expect(cancelButton).toBeDisabled();
    expect(proceedButton).toBeDisabled();
  });
});
