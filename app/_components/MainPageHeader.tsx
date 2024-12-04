'use client';

import { useState } from 'react';
import Calendar from 'react-calendar';
import './CustomCalendar.css';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';

export default function MainPageHeader() {
  // 북마크 상태 토글 - 아직 정상작동 x
  const [isBookmarked, setIsBookmarked] = useState(false);

  return (
    <div className='flex justify-center items-center gap-20 bg-gray-300 py-8 px-40'>
      {/* SWIPER */}
      <div className='w-[32.625rem] h-[25.5625rem]'>
        <h1 className='text-2xl font-bold mb-8'>내일 시작인 독서 모임</h1>
        <Swiper spaceBetween={10} slidesPerView={1}>
          {[1, 2, 3].map((_, idx) => (
            <SwiperSlide key={idx}>
              <div className='flex flex-row w-[32.625rem] h-[21.5625rem] border rounded-lg bg-white shadow-md'>
                <div className='flex justify-center items-center bg-orange-300 rounded-lg w-[14.375rem] h-[21.5625rem]'>
                  이미지 영역
                </div>
                <div className='p-4'>
                  <h3 className='text-xl font-bold'>
                    독서 모임 테스트 {idx + 1}
                  </h3>
                  <p className='text-sm text-gray-600 mt-6'>12월 04일 시작</p>
                  <div className='flex items-center gap-2 mt-20'>
                    <div className='bg-gray-200 py-1 px-2 rounded-full'>🤦‍♂️</div>
                    <span className='text-sm'>31 / 50 명</span>
                  </div>
                  <div className='flex items-center justify-between mt-20 gap-6'>
                    <Button className='w-[12.5rem]'>함께 읽기</Button>
                    <button
                      onClick={() => setIsBookmarked(!isBookmarked)}
                      aria-label='Bookmark'
                      className='text-lg'
                    >
                      {isBookmarked ? '★' : '☆'}
                    </button>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* CALENDAR */}
      <div className='w-[28rem]'>
        <Calendar
          locale='en-GB'
          formatShortWeekday={(locale, date) => format(date, 'EEE')}
          formatMonthYear={(locale, date) =>
            date.toLocaleString(locale, { month: 'short', year: 'numeric' })
          }
          view='month'
          prev2Label={null}
          next2Label={null}
          showNeighboringMonth={false}
        />
      </div>
    </div>
  );
}
