'use client';

import SlideNextIcon from '@/components/common/icons/SlideNextIcon';
import { useReviewQuery } from '@/hooks/useReviewQuery';

export default function UserInfo() {
  const { reviews } = useReviewQuery();

  if (!reviews) return null;
  const { total } = reviews;

  return (
    <div className='flex items-center gap-2 p-5'>
      <div className='w-[60px] h-[60px] bg-[#A0A0A0] rounded-full'></div>
      <div>
        <p className='font-bold'>테스트</p>
        <div className='flex gap-2.5'>
          <p>작성한 독서 리뷰 {total || 0}</p>
          <SlideNextIcon className='w-6 h-6' />
        </div>
      </div>
    </div>
  );
}
