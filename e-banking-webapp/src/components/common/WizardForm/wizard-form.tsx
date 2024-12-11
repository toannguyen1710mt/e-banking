'use client';

import React, { HTMLProps, useMemo } from 'react';
import { Slot, Slottable } from '@radix-ui/react-slot';
import { UseFormReturn } from 'react-hook-form';
import { z } from 'zod';
import { AnimatePresence, motion } from 'framer-motion';

// Styles
import './wizard-form.css';

// Hooks
import { useWizardForm } from '@/hooks';

// Context
import { WizardFormContext } from '@/context';

interface WizardFormProps<T extends z.ZodType> {
  schema: T;
  form: UseFormReturn<z.infer<T>>;
  onSubmit: (data: z.infer<T>) => void;
  className?: string;
}

type StepProps = React.PropsWithChildren<
  {
    name: string;
    asChild?: boolean;
  } & React.HTMLProps<HTMLDivElement>
>;

function WizardFormRoot<T extends z.ZodType>({
  schema,
  form,
  onSubmit,
  children,
  className,
}: React.PropsWithChildren<WizardFormProps<T>>) {
  const steps = useMemo(
    () =>
      React.Children.toArray(children).filter(
        (child): child is React.ReactElement<StepProps> =>
          React.isValidElement(child) && child.type === WizardFormStep,
      ),
    [children],
  );

  const header = useMemo(() => {
    return React.Children.toArray(children).find(
      (child) => React.isValidElement(child) && child.type === WizardFormHeader,
    );
  }, [children]);

  const footer = useMemo(() => {
    return React.Children.toArray(children).find(
      (child) => React.isValidElement(child) && child.type === WizardFormFooter,
    );
  }, [children]);

  const stepNames = steps.map((step) => step.props.name);
  const wizardFormStep = useWizardForm(schema, form, stepNames);

  return (
    <WizardFormContext.Provider value={wizardFormStep}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={className}>
        {header}

        <div>
          {steps.map((step, index) => {
            const isActive = index === wizardFormStep.currentStepIndex;
            return isActive ? (
              <AnimatePresence key={index}>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {step}
                </motion.div>
              </AnimatePresence>
            ) : undefined;
          })}
        </div>

        {footer}
      </form>
    </WizardFormContext.Provider>
  );
}

WizardFormRoot.displayName = 'WizardForm.Root';

const WizardFormStep = React.forwardRef<
  HTMLDivElement,
  React.PropsWithChildren<
    {
      asChild?: boolean;
    } & HTMLProps<HTMLDivElement>
  >
>(function WizardFormStep({ children, asChild, ...props }, ref) {
  const Cmp = asChild ? Slot : 'div';

  return (
    <Cmp ref={ref} {...props}>
      <Slottable>{children}</Slottable>
    </Cmp>
  );
});

WizardFormStep.displayName = 'WizardForm.Step';

const WizardFormHeader = React.forwardRef<
  HTMLDivElement,
  React.PropsWithChildren<
    {
      asChild?: boolean;
    } & HTMLProps<HTMLDivElement>
  >
>(function WizardFormHeader({ children, asChild, ...props }, ref) {
  const Cmp = asChild ? Slot : 'div';

  return (
    <Cmp ref={ref} {...props}>
      <Slottable>{children}</Slottable>
    </Cmp>
  );
});

WizardFormHeader.displayName = 'WizardForm.Header';

const WizardFormFooter = React.forwardRef<
  HTMLDivElement,
  React.PropsWithChildren<
    {
      asChild?: boolean;
    } & HTMLProps<HTMLDivElement>
  >
>(function WizardFormFooter({ children, asChild, ...props }, ref) {
  const Cmp = asChild ? Slot : 'div';

  return (
    <Cmp ref={ref} {...props}>
      <Slottable>{children}</Slottable>
    </Cmp>
  );
});
WizardFormFooter.displayName = 'WizardForm.Footer';

/**
 * @name createStepSchema
 * @description Create a schema for a wizard form
 * @param steps
 */
export function createStepSchema<T extends Record<string, z.ZodType>>(
  steps: T,
) {
  return z.object(steps);
}

export {
  WizardFormRoot as Root,
  WizardFormHeader as Header,
  WizardFormFooter as Footer,
  WizardFormStep as Step,
};
