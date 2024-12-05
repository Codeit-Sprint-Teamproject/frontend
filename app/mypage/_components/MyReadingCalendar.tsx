'use client';

import Calendar from 'react-calendar';
import './CustomReadingCalendar.css';
import { formatDate } from 'date-fns';

export default function MyReadingCalendar() {
  return (
    <Calendar
      locale='en'
      view='month'
      formatMonthYear={(locale, date) => formatDate(date, 'MMM yyyy')}
      prev2Label={null}
      next2Label={null}
      showNeighboringMonth={false}
    />
  );
}
