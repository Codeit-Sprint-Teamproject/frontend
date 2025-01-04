'use client';

import { useState } from 'react';
import Calendar from 'react-calendar';
import { useQuery } from '@tanstack/react-query';
import { getReadingCalendar } from '../_lib/getReadingCalendar';
import './CustomReadingCalendar.css';
import SlideNextIcon from '@/components/common/icons/SlideNextIcon';
import SlidePrevIcon from '@/components/common/icons/SlidePrevIcon';
import { format, formatDate, isAfter, isToday } from 'date-fns';
import Image from 'next/image';

export default function MyReadingCalendar() {
  const [activeStartDate, setActiveStartDate] = useState(new Date());
  const yearMonth = formatDate(activeStartDate, 'yyyy-MM');
  const isFuture = isAfter(activeStartDate, new Date());

  const goToThisMonth = () => {
    const today = new Date();
    setActiveStartDate(new Date(today.getFullYear(), today.getMonth(), 1));
  };
  const { data: books } = useQuery({
    queryKey: ['mypage', 'calendar', 'reading', yearMonth],
    queryFn: () => getReadingCalendar(yearMonth),
    enabled: !isFuture,
  });

  const book = books?.filter((book) => book.totalBookCount > 0);
  const getBookCover = ({ date }: { date: Date }) => {
    const formattedDate = format(date, 'yyyy-MM-dd');
    const data = book?.find((b) => b.date === formattedDate);

    return data ? (
      <>
        <Image
          src={data.bookResponses[0].image}
          className='book-cover'
          alt='책 표지'
          width={54}
          height={81}
        />
        <span className='book-count'>+{data.totalBookCount}</span>
      </>
    ) : null;
  };
  return (
    <div className='reading-calendar'>
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
        className='reading-calendar react-calendar__navigation__today-button'
        onClick={goToThisMonth}
      >
        오늘
      </button>
    </div>
  );
}
