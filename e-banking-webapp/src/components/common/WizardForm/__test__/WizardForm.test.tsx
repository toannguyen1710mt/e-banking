import { fireEvent, render, screen } from '@testing-library/react';
import { z } from 'zod';
import { act } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

// Components
import * as WizardForm from '..';

// Hooks
import { useWizardForm } from '@/hooks';

jest.mock('@/hooks', () => ({
  useWizardForm: jest.fn().mockImplementation(() => ({
    currentStepIndex: 0,
    onNextStep: jest.fn(),
  })),
}));

const mockedUseWizardForm = jest.mocked(useWizardForm);

describe('WizardForm component', () => {
  const schema = z.object({
    step1Field: z.string().min(1, 'Required'),
    step2Field: z.string().min(1, 'Required'),
  });

  const onSubmitMock = jest.fn();
  const TestWizardForm = () => {
    const form = useForm({
      defaultValues: { step1Field: 'aaa', step2Field: 'aaa' },
      resolver: zodResolver(schema),
    });

    return (
      <WizardForm.Root schema={schema} form={form} onSubmit={onSubmitMock}>
        <WizardForm.Header>Form Header</WizardForm.Header>
        <WizardForm.Step name='step1'>
          <input
            aria-label='step1'
            placeholder='Step 1 Field'
            {...form.register('step1Field')}
          />
        </WizardForm.Step>
        <WizardForm.Step name='step2'>
          <input
            aria-label='step1'
            placeholder='Step 2 Field'
            {...form.register('step2Field')}
          />
        </WizardForm.Step>
        <WizardForm.Footer>
          <button type='button'>Previous</button>
          <button data-testId='next-button' type='submit'>
            Next
          </button>
        </WizardForm.Footer>
      </WizardForm.Root>
    );
  };

  it('renders the header, footer, and first step by default', () => {
    render(<TestWizardForm />);

    expect(screen.getByText('Form Header')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Step 1 Field')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Next/i })).toBeInTheDocument();
  });

  it('displays the correct step based on `currentStepIndex`', () => {
    mockedUseWizardForm.mockReturnValueOnce({
      currentStep: 'step1',
      currentStepIndex: 1,
      totalSteps: 2,
      isFirstStep: false,
      isLastStep: false,
      onNextStep: jest.fn(),
      onPrevStep: jest.fn(),
      goToStep: jest.fn(),
      errors: {},
      direction: 'forward',
      validateStep: jest.fn(),
      isValid: true,
    } as unknown as ReturnType<typeof useWizardForm>);

    render(<TestWizardForm />);

    expect(
      screen.queryByPlaceholderText('Step 1 Field'),
    ).not.toBeInTheDocument();
    expect(screen.getByPlaceholderText('Step 2 Field')).toBeInTheDocument();
  });

  it('calls the onSubmit handler with correct data when the form is submitted', async () => {
    render(<TestWizardForm />);

    const input = screen.getByPlaceholderText('Step 1 Field');

    await act(async () => {
      fireEvent.change(input, { target: { value: 'Test value' } });
    });

    await act(async () => {
      fireEvent.submit(screen.getByTestId('next-button'));
    });

    expect(onSubmitMock).toHaveBeenCalledTimes(1);
  });
});
