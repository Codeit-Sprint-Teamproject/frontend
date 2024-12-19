'use client';

import { useEffect, useState } from 'react';
import { useMeetingContext } from '../_lib/MeetingDetailContext';
import { calculateEndDate } from '../_utils/calculateEndDate';
import BookInfo from './BookInfo';
import BookIcon from '@/public/BookIcon';
import CalendarDotIcon from '@/public/CalendarDotIcon';
import UsersIcon from '@/public/UsersIcon';

export default function MeetingDetailRight() {
  const { meetingData, loading, error } = useMeetingContext();
  const [endDate, setEndDate] = useState<string>('');
  const [meetingDuration, setMeetingDuration] = useState(0);

  useEffect(() => {
    if (meetingData?.startDate && meetingData?.gatheringWeek) {
      const res = calculateEndDate(
        meetingData.startDate,
        meetingData.gatheringWeek,
      );
      setEndDate(res);
      setMeetingDuration(meetingData.gatheringWeek / 7);
    }
  }, [meetingData]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: 데이터를 불러오지 못했습니다.</div>;

  return (
    <div className='w-[654px] h-[670px] rounded-[4px] border-[1px] border-[rgba(0,0,0,0.3)] flex flex-col py-[23px] px-[24px]'>
      <div className='w-[84px] h-[36px] py-[6px] px-[10px] box-border text-center rounded-[8px] bg-[#A0A0A0]'>
        모집중
      </div>
      <div className='h-[49px] mt-[13px] font-bold text-3xl'>
        N일뒤 모임이 시작됩니다.
      </div>
      <div className='grid grid-cols-[1fr_2fr] w-[40%] gap-3'>
        <UsersIcon width={25} height={25} />
        <div>
          {meetingData?.currentCapacity}명 / {meetingData?.maxCapacity}명
        </div>
        <BookIcon width={25} height={25} />
        <div>매일 {meetingData?.readingTimeGoal}분</div>
        <CalendarDotIcon width={25} height={25} />
        <div>{meetingDuration}주 동안</div>
      </div>
      <div className='h-[98px] flex flex-row justify-around items-center mt-[12px] bg-gray-200'>
        <div className='flex flex-col justify-center items-center text-xl'>
          <span>시작일</span>
          <span className='font-bold'>{meetingData?.startDate}</span>
        </div>
        <div className='flex flex-col justify-center items-center text-xl'>
          <span>종료일</span>
          <span className='font-bold'>{endDate}</span>
        </div>
      </div>
      <h3 className='font-bold text-xl mt-6'>함께 읽을 책</h3>
      <BookInfo
        bookImage={meetingData?.bookImage}
        bookTitle={meetingData?.bookTitle}
        author={meetingData?.author}
        publisher={meetingData?.publisher}
        publishDate={meetingData?.publishDate}
        star={meetingData?.star}
      />
      <button className='h-[49px] mt-[7px] bg-[#D9D9D9] font-medium text-[18px]'>
        리뷰 보러가기
      </button>
    </div>
  );
}
