'use client';

import { useRef, useState } from 'react';
import { InputProps } from '@nextui-org/react';

// Constants
import { MONTHS } from '@/constants';

// Interfaces
import { TEXT_SIZE } from '@/interfaces';

// Hooks
import { useOnClickOutside } from '@/hooks';

// Utils
import { formatMonthYear, formatYearMonthToShortDate } from '@/utils';

// Components
import { Button, Input, Text } from '../common';
import { CalendarIcon } from '../icons';

interface IMonthYearPicker extends Omit<InputProps, 'onChange' | 'label'> {
  customClass?: string;
  label?: string;
  onChange: (date: string) => void;
}

export const MonthYearPicker = ({
  customClass,
  label,
  onChange,
  ...rest
}: IMonthYearPicker) => {
  const [year, setYear] = useState<number | null>(null);
  const [month, setMonth] = useState<number | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const dateMonthPickerRef = useRef<HTMLDivElement>(null);
  const newYear = year ?? new Date().getFullYear();
  const newMonth = month ?? new Date().getMonth() + 1;

  const years = Array.from(
    { length: 100 },
    (_, index) => new Date().getFullYear() + index,
  );

  const handleMonthClick = (selectedMonth: number) => {
    setMonth(selectedMonth);
    setYear(newYear);
    setIsOpen(false);

    if (onChange) {
      onChange(
        formatMonthYear({
          year: newYear,
          month: selectedMonth,
        }),
      );
    }
  };

  const handleYearChange = (event: { target: { value: string } }) => {
    const selectedYear = parseInt(event.target.value);
    setYear(selectedYear);
    setMonth(newMonth);

    if (onChange) {
      onChange(
        formatMonthYear({
          year: selectedYear,
          month: newMonth,
        }),
      );
    }
  };

  const toggleDropdown = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  const handleCloseDateMonthPicker = () => {
    setIsOpen(false);
  };

  useOnClickOutside(dateMonthPickerRef, handleCloseDateMonthPicker);

  return (
    <div className={`relative ${customClass}`}>
      <Text
        size={TEXT_SIZE.SM}
        className='mb-2 leading-4 text-primary-200 opacity-50'
      >
        {label}
      </Text>
      <Input
        startContent={
          <Button
            color='outline'
            className='inline-block w-4 min-w-4 border-none p-0 text-current'
            onClick={toggleDropdown}
          >
            <CalendarIcon />
          </Button>
        }
        onClick={toggleDropdown}
        placeholder='MM/YY'
        value={
          year && month
            ? formatYearMonthToShortDate(`${MONTHS[month - 1]} ${year}`)
            : 'MM/YY'
        }
        readOnly
        {...rest}
      />
      {isOpen && (
        <div
          className='absolute z-10 mt-2 w-full min-w-[200px] max-w-[250px] rounded-md border-none bg-background-300 shadow-lg'
          ref={dateMonthPickerRef}
        >
          <div className='flex flex-col gap-4 p-2'>
            {/* Year Selector */}
            <div className='flex items-center gap-2'>
              <label htmlFor='year' className='font-medium text-white'>
                Year:
              </label>
              <select
                id='year'
                value={year || new Date().getFullYear()}
                onChange={handleYearChange}
                className='rounded-md border bg-background-300 px-3 py-1 text-white focus:border-blue-300 focus:outline-none focus:ring'
              >
                {years.map((yr) => (
                  <option key={yr} value={yr}>
                    {yr}
                  </option>
                ))}
              </select>
            </div>

            {/* Month Selector */}
            <div className='grid grid-cols-3 gap-2'>
              {MONTHS.map((monthName, index) => (
                <button
                  key={monthName}
                  onClick={() => handleMonthClick(index + 1)}
                  className={`rounded-md px-1 py-2 text-sm font-medium ${
                    index === (month ?? 1) - 1
                      ? 'bg-secondary-300 text-white'
                      : 'bg-background-300 text-gray-200 hover:bg-background-200'
                  }`}
                >
                  {monthName}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
