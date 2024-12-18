'use client';

import { useQuery } from '@tanstack/react-query';
import { getBestAndPendingReviews } from '../_lib/getBestAndPendingReviews';
import SlideNextIcon from '@/app/_components/common/icons/SlideNextIcon';

export default function UserInfo() {
  const { data: reviews } = useQuery({
    queryKey: ['reviews', 'best'],
    queryFn: getBestAndPendingReviews,
    staleTime: 60 * 1000,
  });

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
