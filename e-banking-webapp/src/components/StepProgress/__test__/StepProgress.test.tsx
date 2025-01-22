import { render, fireEvent, screen } from '@testing-library/react';

// Component
import { StepProgress } from '..';

describe('StepProgress Component', () => {
  const steps = 4;
  const mockOnPrevStep = jest.fn();

  beforeEach(() => {
    mockOnPrevStep.mockClear();
  });

  it('renders the correct number of steps', () => {
    render(
      <StepProgress steps={steps} activeStep={2} onPrevStep={mockOnPrevStep} />,
    );

    const stepElements = screen.getAllByRole('button');
    expect(stepElements).toHaveLength(steps);
  });

  it('applies the correct class to active and inactive steps', () => {
    render(
      <StepProgress steps={steps} activeStep={2} onPrevStep={mockOnPrevStep} />,
    );

    const stepElements = screen.getAllByRole('button');

    stepElements.forEach((step, index) => {
      if (index === 2) {
        expect(step).not.toHaveClass('opacity-10');
      } else {
        expect(step).toHaveClass('opacity-10');
      }
    });
  });

  it('calls onPrevStep when clicking on a step before the active one', () => {
    render(
      <StepProgress steps={steps} activeStep={2} onPrevStep={mockOnPrevStep} />,
    );

    const stepElements = screen.getAllByRole('button');

    fireEvent.click(stepElements[0]); // Click on the first step

    expect(mockOnPrevStep).toHaveBeenCalledTimes(1);
  });

  it('does not call onPrevStep when clicking on the active step', () => {
    render(
      <StepProgress steps={steps} activeStep={2} onPrevStep={mockOnPrevStep} />,
    );

    const stepElements = screen.getAllByRole('button');

    fireEvent.click(stepElements[2]);

    expect(mockOnPrevStep).not.toHaveBeenCalled();
  });

  it('does not call onPrevStep when clicking on a step after the active one', () => {
    render(
      <StepProgress steps={steps} activeStep={2} onPrevStep={mockOnPrevStep} />,
    );

    const stepElements = screen.getAllByRole('button');

    fireEvent.click(stepElements[3]);

    expect(mockOnPrevStep).not.toHaveBeenCalled();
  });
});
