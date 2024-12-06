'use client';

import Calendar from 'react-calendar';
import NextIcon from '../_svg/NextIcon';
import PrevIcon from '../_svg/PrevIcon';
import './CustomReadingCalendar.css';
import { formatDate } from 'date-fns';
import Image from 'next/image';

export default function MyReadingCalendar() {
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
      <div className='absolute top-1/4 left-1/4'>
        <Image
          src={data.bookCover}
          className='z-0'
          alt={data.title}
          width='50'
          height='75'
        />
      </div>
    ) : null;
  };
  return (
    <div className='relative'>
      <Calendar
        locale='ko'
        view='month'
        formatMonthYear={(locale, date) => formatDate(date, 'yyyy년 M월')}
        formatDay={(locale, date) => formatDate(date, 'd')}
        prevLabel={<PrevIcon />}
        nextLabel={<NextIcon />}
        prev2Label={null}
        next2Label={null}
        calendarType='hebrew'
        showNeighboringMonth={false}
        tileContent={getBookCover}
      />
      <button className='react-calendar__navigation__today-button'>오늘</button>
    </div>
  );
}
