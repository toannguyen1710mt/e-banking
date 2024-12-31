'use client';

// Libs
import { useState, useRef, useEffect } from 'react';
import { DateValue, InputProps } from '@nextui-org/react';
import { today, getLocalTimeZone } from '@internationalized/date';

// Component
import { CalendarIcon, Button, Input, Calendar } from '@/components';

interface DatePickerProps extends Omit<InputProps, 'onChange'> {
  value?: string;
  onChange?: (value: string) => void;
}

export const DatePicker = (props: DatePickerProps) => {
  const { value = '', onChange, ...rest } = props;
  const [isOpenCalendar, setIsOpenCalendar] = useState(false);
  const [inputValue, setInputValue] = useState<string>(value || '');
  const calendarRef = useRef<HTMLDivElement>(null);

  const toggleCalendar = () => {
    setIsOpenCalendar((prev) => !prev);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = e.target.value.replace(/\D/g, '');

    if (newValue.length === 4) {
      newValue += '/';
    } else if (newValue.length > 4) {
      newValue = `${newValue.slice(0, 4)}/${newValue.slice(4, 6)}`;
    }

    if (newValue.length === 7) {
      const month = parseInt(newValue.slice(5, 7), 10);

      if (month < 1 || month > 12) {
        newValue = newValue.slice(0, 5);
      }
    }

    setInputValue(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  const handleDateChange = (date: DateValue) => {
    const year = date.year.toString();
    const month = date.month.toString().padStart(2, '0');
    const formattedDate = `${year}/${month}`;

    setInputValue(formattedDate);
    setIsOpenCalendar(false);

    if (onChange) {
      onChange(formattedDate);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        calendarRef.current &&
        !calendarRef.current.contains(event.target as Node)
      ) {
        setIsOpenCalendar(false);
      }
    };

    if (isOpenCalendar) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpenCalendar]);

  useEffect(() => {
    if (value !== inputValue) {
      setInputValue(value || '');
    }
  }, [value]);

  return (
    <div className='flex w-full flex-col'>
      <Input
        startContent={
          <Button
            color='outline'
            className='inline-block w-4 min-w-4 border-none p-0 text-current'
            onClick={toggleCalendar}
          >
            <CalendarIcon />
          </Button>
        }
        classNames={{
          input: 'm-0 p-0 !pl-3',
        }}
        placeholder='YYYY/MM'
        value={inputValue}
        onChange={handleInputChange}
        maxLength={7}
        {...rest}
      />
      {isOpenCalendar && (
        <div ref={calendarRef}>
          <Calendar
            showMonthAndYearPickers
            onChange={handleDateChange}
            minValue={today(getLocalTimeZone())}
            classNames={{
              header: 'bg-red text-white',
              title: 'text-white',
              headerWrapper: 'after:bg-background-300',
              pickerItem: 'text-white',
            }}
          />
        </div>
      )}
    </div>
  );
};
