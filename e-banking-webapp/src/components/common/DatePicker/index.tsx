import { CalendarIcon } from '@/components/icons';
import { DateInput } from './DatePicker';
import { Button } from '../Button';
import { useState } from 'react';
import { Calendar } from '../Calendar';

export const Test = () => {
  const [openCalendar, setOpenCalendar] = useState(false);

  const handleCalendar = () => {
    setOpenCalendar(!openCalendar);
  };

  return (
    <div>
      <DateInput
        startContent={
          <Button
            color={'outline'}
            className='inline-block w-full min-w-4 border-none p-0 text-current'
            onClick={handleCalendar}
          >
            <CalendarIcon />
          </Button>
        }
      />
      {openCalendar && <Calendar />}
    </div>
  );
};
