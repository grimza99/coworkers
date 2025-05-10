import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './style.css';

interface CalendarSelectProps {
  onDateChange: (date: Date) => void;
  date: Date;
  disablePast?: boolean;
}

export default function CalendarSelect({ onDateChange, date, disablePast }: CalendarSelectProps) {
  return (
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
      minDate={disablePast ? new Date() : undefined}
    />
  );
}
