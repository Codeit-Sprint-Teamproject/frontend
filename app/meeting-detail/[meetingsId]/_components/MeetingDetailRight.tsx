'use client';

import { calculateEndDate } from '../_utils/calculateEndDate';
import { calculateRemainingDays } from '../_utils/calculateRemainDays';
import BookInfo from './BookInfo';
import { IMeetingDetail } from '@/app/types';
import BookIcon from '@/public/BookIcon';
import CalendarDotIcon from '@/public/CalendarDotIcon';
import UsersIcon from '@/public/UsersIcon';

export default function MeetingDetailRight({ data }: IMeetingDetail) {
  const endDate = calculateEndDate(
    data.startDate.toString(),
    data.gatheringWeek,
  );
  const RemainDays = calculateRemainingDays(endDate);
  const meetingDuration = data.gatheringWeek / 7;

  return (
    <div className='w-[654px] h-[670px] rounded-[4px] border-[1px] border-[rgba(0,0,0,0.3)] flex flex-col py-[23px] px-[24px]'>
      <div className='w-[84px] h-[36px] py-[6px] px-[10px] box-border text-center rounded-[8px] bg-[#A0A0A0]'>
        모집중
      </div>
      <div className='h-[49px] mt-[13px] font-bold text-3xl'>
        {RemainDays}일 뒤 모임이 시작됩니다.
      </div>
      <div className='grid grid-cols-[1fr_2fr] w-[40%] gap-3'>
        <UsersIcon width={25} height={25} />
        <div>
          {data?.currentCapacity}명 / {data?.maxCapacity}명
        </div>
        <BookIcon width={25} height={25} />
        <div>매일 {data?.readingTimeGoal}분</div>
        <CalendarDotIcon width={25} height={25} />
        <div>{meetingDuration}주 동안</div>
      </div>
      <div className='h-[98px] flex flex-row justify-around items-center mt-[12px] bg-gray-200'>
        <div className='flex flex-col justify-center items-center text-xl'>
          <span>시작일</span>
          <span className='font-bold'>{data?.startDate}</span>
        </div>
        <div className='flex flex-col justify-center items-center text-xl'>
          <span>종료일</span>
          <span className='font-bold'>{endDate}</span>
        </div>
      </div>
      <h3 className='font-bold text-xl mt-6'>함께 읽을 책</h3>
      <BookInfo
        bookImage={data?.bookImage}
        bookTitle={data?.bookTitle}
        author={data?.author}
        publisher={data?.publisher}
        publishDate={data?.publishDate}
        star={data?.star}
      />
      <button className='h-[49px] mt-[7px] bg-[#D9D9D9] font-medium text-[18px]'>
        리뷰 보러가기
      </button>
    </div>
  );
}
