import { renderHook } from '@testing-library/react';
import { useForm } from 'react-hook-form';
import { act } from 'react';
import { z } from 'zod';

// Hooks
import { useWizardForm } from '..';

// Mock schema
const mockSchema = z.object({
  step1: z.object({
    field1: z.string().min(1, 'Field1 is required'),
  }),
  step2: z.object({
    field2: z.number().min(1, 'Field2 must be greater than 0'),
  }),
  step3: z.object({
    field3: z.string(),
  }),
});

// Mock step names
const mockSteps = ['step1', 'step2', 'step3'];

describe('useWizardForm hook', () => {
  it('initializes correctly', () => {
    const { result } = renderHook(() =>
      useWizardForm(
        mockSchema,
        useForm<{
          step1: { field1: string };
          step2: { field2: number };
          step3: { field3: string };
        }>({
          defaultValues: {
            step1: { field1: '' },
            step2: { field2: 0 },
            step3: { field3: '' },
          },
        }),
        mockSteps,
      ),
    );

    expect(result.current.currentStepIndex).toBe(0);
    expect(result.current.currentStep).toBe('step1');
    expect(result.current.isFirstStep).toBe(true);
    expect(result.current.isLastStep).toBe(false);
  });

  it('moves to the next step if valid', () => {
    const { result } = renderHook(() =>
      useWizardForm(
        mockSchema,
        useForm<{
          step1: { field1: string };
          step2: { field2: number };
          step3: { field3: string };
        }>({
          defaultValues: {
            step1: { field1: 'test' },
            step2: { field2: 0 },
            step3: { field3: '' },
          },
        }),
        mockSteps,
      ),
    );

    act(() => {
      result.current.onNextStep();
    });

    expect(result.current.currentStepIndex).toBe(1);
    expect(result.current.currentStep).toBe('step2');
  });

  it('does not move to the next step if invalid', () => {
    const { result } = renderHook(() =>
      useWizardForm(
        mockSchema,
        useForm<{
          step1: { field1: string };
          step2: { field2: number };
          step3: { field3: string };
        }>({
          defaultValues: {
            step1: { field1: '' },
            step2: { field2: 0 },
            step3: { field3: '' },
          },
        }),
        mockSteps,
      ),
    );

    act(() => {
      result.current.onNextStep();
    });

    expect(result.current.currentStepIndex).toBe(0); // Validation fails, stays on the same step
  });

  it('moves to the previous step', () => {
    const { result } = renderHook(() =>
      useWizardForm(
        mockSchema,
        useForm<{
          step1: { field1: string };
          step2: { field2: number };
          step3: { field3: string };
        }>({
          defaultValues: {
            step1: { field1: 'test' },
            step2: { field2: 0 },
            step3: { field3: '' },
          },
        }),
        mockSteps,
      ),
    );

    act(() => {
      result.current.onPrevStep(); // Go to step 2
    });

    act(() => {
      result.current.onPrevStep(); // Go back to step 1
    });

    expect(result.current.currentStepIndex).toBe(0);
    expect(result.current.isFirstStep).toBe(true);
  });

  it('navigates to a specific step', () => {
    const { result } = renderHook(() =>
      useWizardForm(
        mockSchema,
        useForm<{
          step1: { field1: string };
          step2: { field2: number };
          step3: { field3: string };
        }>({
          defaultValues: {
            step1: { field1: 'text' },
            step2: { field2: 0 },
            step3: { field3: '' },
          },
        }),
        mockSteps,
      ),
    );

    act(() => {
      result.current.goToStep(2); // Go directly to step 3
    });

    expect(result.current.currentStepIndex).toBe(2);
    expect(result.current.currentStep).toBe('step3');
  });

  it('validates current step data correctly', () => {
    const { result } = renderHook(() =>
      useWizardForm(
        mockSchema,
        useForm<{
          step1: { field1: string };
          step2: { field2: number };
          step3: { field3: string };
        }>({
          defaultValues: {
            step1: { field1: '' },
            step2: { field2: 0 },
            step3: { field3: '' },
          },
        }),
        mockSteps,
      ),
    );

    expect(result.current.validateStep()).toBe(false); // Validation fails for step1
  });

  it('triggers field validations on failure', async () => {
    const mockTrigger = jest.fn();
    const { result } = renderHook(() =>
      useWizardForm(
        mockSchema,
        {
          ...useForm<{
            step1: { field1: string };
            step2: { field2: number };
            step3: { field3: string };
          }>({
            defaultValues: {
              step1: { field1: '' },
              step2: { field2: 0 },
              step3: { field3: '' },
            },
          }),
          trigger: mockTrigger,
        },
        mockSteps,
      ),
    );

    act(() => {
      result.current.onNextStep();
    });

    expect(mockTrigger).toHaveBeenCalledWith('step1.field1');
  });

  it('prevents navigating to invalid step indexes', () => {
    const { result } = renderHook(() =>
      useWizardForm(
        mockSchema,
        useForm<{
          step1: { field1: string };
          step2: { field2: number };
          step3: { field3: string };
        }>({
          defaultValues: {
            step1: { field1: '' },
            step2: { field2: 0 },
            step3: { field3: '' },
          },
        }),
        mockSteps,
      ),
    );

    act(() => {
      result.current.goToStep(-1); // Invalid index
    });

    expect(result.current.currentStepIndex).toBe(0);

    act(() => {
      result.current.goToStep(5); // Out-of-bounds index
    });

    expect(result.current.currentStepIndex).toBe(0);
  });

  it('sets direction to backward on previous step', () => {
    const { result } = renderHook(() =>
      useWizardForm(
        mockSchema,
        useForm<{
          step1: { field1: string };
          step2: { field2: number };
          step3: { field3: string };
        }>({
          defaultValues: {
            step1: { field1: 'test' },
            step2: { field2: 0 },
            step3: { field3: '' },
          },
        }),
        mockSteps,
      ),
    );

    act(() => {
      result.current.onNextStep();
    });

    expect(result.current.currentStepIndex).toBe(1);
    expect(result.current.currentStep).toBe('step2');

    act(() => {
      result.current.onPrevStep();
    });

    expect(result.current.currentStepIndex).toBe(0);
    expect(result.current.currentStep).toBe('step1');
    expect(result.current.direction).toBe('backward');
  });

  it('sets direction correctly when going to a specific step', () => {
    const { result } = renderHook(() =>
      useWizardForm(
        mockSchema,
        useForm<{
          step1: { field1: string };
          step2: { field2: number };
          step3: { field3: string };
        }>({
          defaultValues: {
            step1: { field1: 'test' },
            step2: { field2: 0 },
            step3: { field3: '' },
          },
        }),
        mockSteps,
      ),
    );

    act(() => {
      result.current.goToStep(2);
    });

    expect(result.current.currentStepIndex).toBe(2);
    expect(result.current.currentStep).toBe('step3');
    expect(result.current.direction).toBe('forward');

    act(() => {
      result.current.goToStep(0);
    });

    expect(result.current.currentStepIndex).toBe(0);
    expect(result.current.currentStep).toBe('step1');
    expect(result.current.direction).toBe('backward');
  });
});
