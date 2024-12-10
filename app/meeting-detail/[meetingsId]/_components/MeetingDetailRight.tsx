import bookopenImg from '@/public/book-open.png';
import calendarDot from '@/public/calendar-dot.png';
import { Users } from 'lucide-react';
import Image from 'next/image';

export default function MeetingDetailRight() {
  return (
    <div className='w-[654px] h-[670px] rounded-[4px] border-[1px] border-[rgba(0,0,0,0.3)] flex flex-col py-[23px] px-[24px]'>
      {/* 모임 상태 */}
      <div className='w-[84px] h-[36px] py-[6px] px-[10px] box-border text-center rounded-[8px] bg-[#A0A0A0]'>
        모집중
      </div>
      {/* 모임 안내 문구 */}
      <div className='h-[49px] mt-[13px] font-bold text-3xl'>
        N일뒤 모임이 시작됩니다.
      </div>
      {/* 모임 규칙 */}
      <div className='grid grid-cols-[1fr_2fr] w-[30%] gap-3'>
        <Users />
        <div>참여 인원</div>
        <Image src={bookopenImg} alt='bookopen-img' />
        <div>독서 시간</div>
        <Image src={calendarDot} alt='calenar-dot' />
        <div>독서 기간</div>
      </div>
      {/* 모임 시작, 종료일 */}
      <div className='h-[98px] flex flex-row justify-around items-center mt-[12px] bg-gray-200'>
        <div className='flex flex-col justify-center items-center text-xl'>
          <span>시작일</span>
          <span className='font-bold'>12월 31일 월요일</span>
        </div>
        <div className='flex flex-col justify-center items-center text-xl'>
          <span>종료일</span>
          <span className='font-bold'>1월 15일 월요일</span>
        </div>
      </div>
      {/* 모임에서 읽을 책 정보 */}
      <h3 className='font-bold text-xl mt-6'>함께 읽을 책</h3>
      <div className='h-[186px] mt-[9px] flex flex-row py-[16px] px-[10px] border-[1px] border-[rgba(0, 0, 0, 0.10)]'>
        <div className='w-[108px] h-[162px] bg-green-300'>이미지 영역</div>
        <div className='ml-[18px]'>
          <span className='text-xl font-bold'>
            디 에센셜: 한강 ( 무선 보급판 )
          </span>
          <div className='grid grid-cols-[1fr_2fr] mt-[9px]'>
            <span>저자</span>
            <span>한강</span>
            <span>출판</span>
            <span>문학동네</span>
            <span>발행일</span>
            <span>2023.06.01</span>
            <span>평점</span>
            <span>☆☆☆☆☆ 4.2</span>
          </div>
        </div>
      </div>
      <button className='h-[49px] mt-[7px] bg-[#D9D9D9]'>리뷰 보러가기</button>
    </div>
  );
}
