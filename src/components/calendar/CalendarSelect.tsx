import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './style.css';

interface CalendarSelectProps {
  isOpen: boolean;
  onDateChange: (date: Date) => void;
  date: Date;
}

export default function CalendarSelect({ isOpen, onDateChange, date }: CalendarSelectProps) {
  return (
    <>
      {isOpen && (
        <Calendar
          value={date}
          onChange={(value) => {
            if (value instanceof Date) {
              onDateChange(value);
            }
          }}
          locale="en"
          calendarType="gregory"
          prev2Label={null}
          next2Label={null}
        />
      )}
    </>
  );
}
