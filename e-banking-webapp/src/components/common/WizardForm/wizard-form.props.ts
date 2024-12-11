import { UseFormReturn } from 'react-hook-form';
import { z } from 'zod';

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
export type { WizardFormProps, StepProps };
