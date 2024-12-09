'use client';

import { useState } from 'react';
import Calendar from 'react-calendar';
import NextIcon from '../_svg/NextIcon';
import PrevIcon from '../_svg/PrevIcon';
import './CustomReadingCalendar.css';
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
      bookCover:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjG17iALTrgmpEhD9eNsSfFsJNVMIgq5AgRg&s',
      title: 'Book 1',
    },
    {
      date: '2024-12-10',
      bookCover:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjG17iALTrgmpEhD9eNsSfFsJNVMIgq5AgRg&s',
      title: 'Book 2',
    },
    {
      date: '2024-12-18',
      bookCover:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjG17iALTrgmpEhD9eNsSfFsJNVMIgq5AgRg&s',
      title: 'Book 3',
    },
  ];
  const getBookCover = ({ date }: { date: Date }) => {
    const formattedDate = date.toISOString().split('T')[0];
    const data = books.find((b) => b.date === formattedDate);

    return data ? (
      <>
        <Image
          src={data.bookCover}
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
    <div className='relative w-[600px]'>
      <Calendar
        locale='ko'
        view='month'
        formatMonthYear={(locale, date) => format(date, 'yyyy년 M월')}
        formatDay={(locale, date) => format(date, 'd')}
        prevLabel={<PrevIcon />}
        nextLabel={<NextIcon />}
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
