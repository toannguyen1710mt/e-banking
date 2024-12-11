import { createContext, useContext } from 'react';
import { z } from 'zod';

// Hooks
import { useWizardForm } from '@/hooks';

export const WizardFormContext = createContext<ReturnType<
  typeof useWizardForm
> | null>(null);

export function useWizardFormContext<Schema extends z.ZodType>() {
  const context = useContext(WizardFormContext) as ReturnType<
    typeof useWizardForm<Schema>
  >;

  if (!context) {
    throw new Error('useWizardFormContext must be used within a WizardForm');
  }

  return context;
}

export function WizardFormContextProvider(props: {
  children: (context: ReturnType<typeof useWizardForm>) => React.ReactNode;
}) {
  const ctx = useWizardFormContext();

  if (Array.isArray(props.children)) {
    const [child] = props.children;

    return (
      child as (context: ReturnType<typeof useWizardForm>) => React.ReactNode
    )(ctx);
  }

  return props.children(ctx);
}
