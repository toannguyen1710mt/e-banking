'use client';

// Libs
import { ReactNode } from 'react';
import {
  Dropdown,
  DropdownMenu,
  DropdownTrigger,
  DropdownItem,
  Button,
  DropdownProps,
  DropdownMenuProps,
  Divider,
} from '@nextui-org/react';
import { cn } from '@nextui-org/theme';

// Components
import { Text } from '@/components';

export interface Option {
  key: string;
  label: string;
}

export interface MenuOption extends Option {
  startContent?: JSX.Element;
  isDisabled?: boolean;
  isReadOnly?: boolean;
}

export interface MenuDropdownProps
  extends Omit<DropdownProps & DropdownMenuProps, 'children'> {
  label?: string;
  options: MenuOption[];
  icon?: JSX.Element;
  isDivided?: boolean;
  customTriggerElement?: ReactNode;
}

export const MenuDropdown = ({
  options,
  label = '',
  icon,
  classNames,
  isDivided,
  customTriggerElement,
  onAction,
  ...rest
}: MenuDropdownProps) => {
  const disabledKeys = options
    .filter(({ isDisabled }) => isDisabled)
    .map(({ key }) => key);

  return (
    <Dropdown
      {...rest}
      classNames={{
        trigger: cn(
          'text-primary-200 rounded-lg bg-background-500 border-1',
          'data-[focus=true]:border-primary data-[focus=true]:border-1',
          classNames?.trigger,
        ),
        content: cn(
          'rounded-sm bg-background-500 min-w-[120px]',
          classNames?.content,
        ),

        base: classNames?.base,
      }}
    >
      <DropdownTrigger className='cursor-pointer'>
        {customTriggerElement || (
          <Button aria-label='Dropdown button' className='flex justify-start'>
            {icon && <div className='text-primary-200'>{icon}</div>}
            {label && <Text className='font-medium'>{label}</Text>}
          </Button>
        )}
      </DropdownTrigger>
      <DropdownMenu
        aria-label='Link Actions'
        classNames={{ list: 'gap-0' }}
        disabledKeys={disabledKeys}
        onAction={onAction}
      >
        {options.map(({ key, label, startContent, isReadOnly }, index) => (
          <DropdownItem
            key={key}
            isReadOnly={isReadOnly}
            startContent={startContent}
            className='relative'
          >
            {label}
            {isDivided && index < options.length - 1 && (
              <Divider className='absolute bottom-0 left-0 right-0' />
            )}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
};
