'use client';

import { calculateEndDate } from '../_utils/calculateEndDate';
import { calculateRemainingDays } from '../_utils/calculateRemainDays';
import BookInfo from './BookInfo';
import { formatDateForDetailPageHeader } from '@/app/_utils/dateFormatter';
import { IMeetingDetail } from '@/app/types';
import BookIcon from '@/public/BookIcon';
import CalendarDotIcon from '@/public/CalendarDotIcon';
import UsersIcon from '@/public/UsersIcon';

export default function MeetingDetailRight({ data }: IMeetingDetail) {
  const endDate = calculateEndDate(
    data.startDate.toString(),
    data.gatheringWeek,
  );
  const remainDays = calculateRemainingDays(endDate);
  const meetingDuration = data.gatheringWeek / 7;

  return (
    <div className='w-[654px] min-h-[600px] rounded-[4px] border-[1px] py-[23px] px-[24px] border-[rgba(0,0,0,0.3)] flex flex-col '>
      <div className='w-[84px] h-[36px] py-[6px] px-[10px] box-border text-center rounded-[8px] bg-[#A0A0A0]'>
        모집중
      </div>
      <div className='h-[49px] mt-[13px] font-bold text-3xl'>
        {remainDays}일 뒤 모임이 시작됩니다.
      </div>
      <div className='grid grid-cols-[1fr_5fr] w-[40%] gap-3'>
        <UsersIcon width={25} height={25} />
        <div>
          참여 {data?.currentCapacity}명 / 정원 {data?.maxCapacity}명
        </div>
        <BookIcon width={25} height={25} />
        <div>매일 {data?.readingTimeGoal}분</div>
        <CalendarDotIcon width={25} height={25} />
        <div>{meetingDuration}주 동안</div>
      </div>
      {/* TODO (희원) 시작일, 종료일 날짜 데이터 출력하는 형식 변경  YYYY-MM-DD -> MM월 DD일 X요일 */}
      <div className='h-[98px] flex flex-row justify-around items-center mt-10 bg-[#F8F8F8]'>
        <div className='w-full h-[90%] flex flex-col justify-center items-center text-xl border-r-[1px] border-[rgba(0, 0, 0, 0.10)]'>
          <span>시작일</span>
          <span className='font-bold'>
            {formatDateForDetailPageHeader(data?.startDate)}
          </span>
        </div>
        <div className='w-full h-[90%] flex flex-col justify-center items-center text-xl'>
          <span>종료일</span>
          <span className='font-bold'>
            {formatDateForDetailPageHeader(data?.endDate)}
          </span>
        </div>
      </div>
      <h3 className='font-bold text-xl mt-10'>함께 읽을 책</h3>
      <BookInfo
        bookImage={data?.bookImage}
        bookTitle={data?.bookTitle}
        author={data?.author}
        publisher={data?.publisher}
        publishDate={data?.publishDate}
        star={data?.star}
      >
        {/* TODO (희원) 독서 리뷰보러가기 : 독서 리뷰 페이지 연결하기 */}
        <button className='w-full h-[49px] mt-[7px] bg-[#CCCCCC] font-medium text-lg'>
          독서 리뷰 보러가기
        </button>
      </BookInfo>
    </div>
  );
}
