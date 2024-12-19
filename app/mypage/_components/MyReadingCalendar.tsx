'use client';

import { useState } from 'react';
import Calendar from 'react-calendar';
import './CustomReadingCalendar.css';
import SlideNextIcon from '@/components/common/icons/SlideNextIcon';
import SlidePrevIcon from '@/components/common/icons/SlidePrevIcon';
import { format, isToday } from 'date-fns';
import Image from 'next/image';

export default function MyReadingCalendar() {
  const [activeStartDate, setActiveStartDate] = useState(new Date());
  const goToThisMonth = () => {
    const today = new Date();
    setActiveStartDate(new Date(today.getFullYear(), today.getMonth(), 1));
  };
  const books = [
    {
      date: '2024-12-05',
      title: 'Book 1',
    },
    {
      date: '2024-12-10',
      title: 'Book 2',
    },
    {
      date: '2024-12-18',
      title: 'Book 3',
    },
  ];
  const getBookCover = ({ date }: { date: Date }) => {
    const formattedDate = date.toISOString().split('T')[0];
    const data = books.find((b) => b.date === formattedDate);

    return data ? (
      <>
        <Image
          src='/book.png'
          className='book-cover'
          alt={data.title}
          width={60}
          height={85}
        />
        <span className='book-count'>+1</span>
      </>
    ) : null;
  };
  return (
    <div className='relative w-[600px] px-[22px]'>
      <Calendar
        locale='ko'
        view='month'
        formatMonthYear={(locale, date) => format(date, 'yyyy년 M월')}
        formatDay={(locale, date) => format(date, 'd')}
        prevLabel={<SlidePrevIcon className='w-6 h-6' />}
        nextLabel={<SlideNextIcon className='w-6 h-6' />}
        prev2Label={null}
        next2Label={null}
        calendarType='hebrew'
        showNeighboringMonth={false}
        tileClassName={({ date }) => (isToday(date) ? 'today-tile' : null)}
        tileContent={getBookCover}
        activeStartDate={activeStartDate}
        onActiveStartDateChange={({ activeStartDate }) =>
          setActiveStartDate(activeStartDate as Date)
        }
      />
      <button
        className='react-calendar__navigation__today-button'
        onClick={goToThisMonth}
      >
        오늘
      </button>
    </div>
  );
}
