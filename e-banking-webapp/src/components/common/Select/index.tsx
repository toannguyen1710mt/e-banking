'use client';

// Libs
import type { SelectProps as SelectNextUiProps } from '@nextui-org/react';
import { cn, SelectItem, Select as SelectNextUi } from '@nextui-org/react';

// Components
import { ChevronDownIcon } from '@/components';

interface Option {
  key: string;
  label: string;
}

interface SelectProps extends Omit<SelectNextUiProps, 'children'> {
  options: Option[];
}

export const Select = ({
  options,
  value,
  placeholder = 'Select',
  classNames,
  ...rest
}: SelectProps): JSX.Element => {
  return (
    <SelectNextUi
      {...rest}
      labelPlacement='outside'
      value={value}
      placeholder={placeholder}
      selectorIcon={<ChevronDownIcon />}
      classNames={{
        mainWrapper: classNames?.mainWrapper,
        base: classNames?.base,
        label: cn(
          'text-primary-200 text-xs font-medium opacity-50',
          'group-data-[invalid=true]:!text-warning group-data-[invalid=true]:opacity-100',
          'group-data-[filled=true]:text-primary-200 after:text-primary-200',
          classNames?.label,
        ),
        value: cn(
          `text-primary-200 text-xs group-data-[invalid=true]:!text-warning font-medium`,
          classNames?.value,
        ),
        trigger: cn(
          'px-2.5 py-2 h-[46px] rounded-sm',
          'bg-background-500 shadow-stack border-1 outline-offset-0',
          'data-[focus=true]:border-1 data-[focus=true]:bg-none',
          'data-[hover=true]:bg-default data-[hover=true]:!border-secondary-200',
          'group-data-[invalid=true]:!border-warning',
          classNames?.trigger,
        ),
        innerWrapper: cn(
          'text-xs leading-[18px] group-data-[invalid=true]:!text-warning',
          classNames?.innerWrapper,
        ),
        selectorIcon: cn('text-primary-200', classNames?.selectorIcon),
        popoverContent: cn(
          'bg-background-500 w-full rounded-sm',
          classNames?.popoverContent,
        ),
        errorMessage: cn('!text-warning text-xs', classNames?.errorMessage),
        listbox: classNames?.listbox,
      }}
    >
      {options.map(({ key, label }) => (
        <SelectItem
          key={key}
          classNames={{
            base: cn(
              'bg-background-500 data-[selectable=true]:focus:bg-none w-full',
              'text-primary-200 data-[hover=true]:text-primary-200 data-[selectable=true]:focus:text-primary-200',
            ),
            title: 'text-xs font-medium',
          }}
        >
          {label}
        </SelectItem>
      ))}
    </SelectNextUi>
  );
};
