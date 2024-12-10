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
          'text-primary-200 text-xs font-medium group-data-[invalid=true]:!text-danger-100',
          'group-data-[filled=true]:text-primary-200 after:text-primary-200',
          classNames?.label,
        ),
        value: cn(
          `text-xs group-data-[invalid=true]:!text-danger-100`,
          value
            ? 'text-primary-300 font-medium'
            : 'text-primary-200 font-medium',
          classNames?.value,
        ),
        trigger: cn(
          'px-2.5 py-2 h-[46px] rounded-sm',
          'bg-background-500 shadow-stack border-1 outline-offset-0',
          'data-[focus=true]:border-1 data-[focus=true]:bg-none',
          'data-[hover=true]:bg-none',
          'group-data-[invalid=true]:!border-danger-100',
          classNames?.trigger,
        ),
        innerWrapper: cn(
          'text-xs leading-[18px] group-data-[invalid=true]:!text-danger-100',
          classNames?.innerWrapper,
        ),
        selectorIcon: cn('text-primary-200', classNames?.selectorIcon),
        popoverContent: cn(
          'bg-background-500 w-full rounded-sm',
          classNames?.popoverContent,
        ),
        errorMessage: cn(
          '!text-danger-100 text-sm ml-2',
          classNames?.errorMessage,
        ),
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
