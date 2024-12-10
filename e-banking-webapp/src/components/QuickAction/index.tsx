'use client';

// Components
import { Button, Text } from '@/components';

interface Action {
  icon: () => JSX.Element;
  label: string;
  isDisabled?: boolean;
  onClick: () => void;
}

interface QuickActionsProps {
  actions: Action[];
}

export const QuickAction = ({ actions }: QuickActionsProps) => {
  return (
    <div className='flex flex-col gap-2 rounded-md bg-background-500 p-3'>
      <Text as='h3' className='text-xs font-semibold'>
        Quick Action
      </Text>
      <ul className='flex rounded-md bg-softWhite'>
        {actions.map((action) => {
          const { icon, label, isDisabled, onClick } = action;

          const ActionIcon = icon;

          return (
            <li key={label}>
              <Button
                className='flex h-full !max-h-none flex-col gap-2 !bg-transparent text-foreground-100'
                isDisabled={isDisabled}
                onClick={onClick}
              >
                <ActionIcon />
                <Text as='span' className='text-2xs'>
                  {label}
                </Text>
              </Button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
