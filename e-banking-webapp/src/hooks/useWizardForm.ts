import { useCallback, useMemo, useState } from 'react';
import { Path, UseFormReturn } from 'react-hook-form';
import { z } from 'zod';

/**
 * @name useWizardForm
 * @description Hook for wizard forms
 * @param schema
 * @param form
 * @param stepNames
 */
export function useWizardForm<Schema extends z.ZodType>(
  schema: Schema,
  form: UseFormReturn<z.infer<Schema>>,
  stepNames: string[],
) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [direction, setDirection] = useState<'forward' | 'backward'>();

  const validateStep = useCallback(() => {
    const currentStepName = stepNames[currentStepIndex] as Path<
      z.TypeOf<Schema>
    >;

    // Check for schema validation
    if (schema instanceof z.ZodObject) {
      const currentStepSchema = schema.shape[currentStepName] as z.ZodType;

      if (!currentStepSchema) return true;

      const currentStepData = form.getValues(currentStepName) ?? {};
      const result = currentStepSchema.safeParse(currentStepData);

      return result.success;
    }

    // Additionally check if there are any errors in the form
    const formErrors = Object.keys(form.formState.errors);
    return formErrors.length === 0;
  }, [schema, form, stepNames, currentStepIndex]);

  const onNextStep = useCallback(
    <Ev extends React.SyntheticEvent>(e: Ev) => {
      // prevent form submission when the user presses Enter
      // or if the user forgets [type="button"] on the button
      e.preventDefault();

      const isValid = validateStep();

      if (!isValid) {
        const currentStepName = stepNames[currentStepIndex] as Path<
          z.TypeOf<Schema>
        >;

        if (schema instanceof z.ZodObject) {
          const currentStepSchema = schema.shape[currentStepName] as z.ZodType;

          if (currentStepSchema) {
            const fields = Object.keys(
              (currentStepSchema as z.ZodObject<never>).shape,
            );
            const keys = fields.map((field) => `${currentStepName}.${field}`);

            // trigger validation for all fields in the current step
            for (const key of keys) {
              void form.trigger(key as Path<z.TypeOf<Schema>>);
            }

            return;
          }
        }
      }

      if (isValid && currentStepIndex < stepNames.length - 1) {
        setDirection('forward');
        setCurrentStepIndex((prev) => prev + 1);
      }
    },
    [validateStep, currentStepIndex, stepNames, schema, form],
  );

  const onPrevStep = useCallback(
    <Ev extends React.SyntheticEvent>(e: Ev) => {
      // prevent form submission when the user presses Enter
      // or if the user forgets [type="button"] on the button
      e.preventDefault();

      if (currentStepIndex > 0) {
        setDirection('backward');
        setCurrentStepIndex((prev) => prev - 1);
      }
    },
    [currentStepIndex],
  );

  const goToStep = useCallback(
    (index: number) => {
      if (index >= 0 && index < stepNames.length && validateStep()) {
        setDirection(index > currentStepIndex ? 'forward' : 'backward');
        setCurrentStepIndex(index);
      }
    },
    [validateStep, stepNames.length, currentStepIndex],
  );

  const isValid = form.formState.isValid;
  const errors = form.formState.errors;

  return useMemo(
    () => ({
      form,
      currentStep: stepNames[currentStepIndex] as string,
      currentStepIndex,
      totalSteps: stepNames.length,
      isFirstStep: currentStepIndex === 0,
      isLastStep: currentStepIndex === stepNames.length - 1,
      onNextStep,
      onPrevStep,
      goToStep,
      direction,
      validateStep,
      isValid,
      errors,
    }),
    [
      form,
      stepNames,
      currentStepIndex,
      onNextStep,
      onPrevStep,
      goToStep,
      direction,
      validateStep,
      isValid,
      errors,
    ],
  );
}
