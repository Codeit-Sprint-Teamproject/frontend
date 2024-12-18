'use client';

import { useQuery } from '@tanstack/react-query';
import { getBestAndPendingReviews } from '../_lib/getBestAndPendingReviews';
import SlideNextIcon from '@/app/_components/common/icons/SlideNextIcon';
import SlidePrevIcon from '@/app/_components/common/icons/SlidePrevIcon';

export default function PendingReviewBox() {
  const { data: reviews } = useQuery({
    queryKey: ['reviews', 'best'],
    queryFn: getBestAndPendingReviews,
  });
  if (!reviews) return null;
  const { bookResponseList } = reviews;
  if (!bookResponseList?.length) {
    return (
      <div className='flex flex-col'>
        <p className='font-bold mb-1'>새로운 리뷰를 기다리고 있어요!</p>
        <div className='w-[372px] h-[249px] bg-[#F6F6F6] text-center'>
          <h3 className='text-xl font-bold mt-12'>
            리뷰하고 싶은 책이 있나요?
          </h3>
          <p className='mt-3'>모읽지에서 작성해 보세요!</p>
          <button className='w-80 h-14 bg-[#C5C5C5] font-bold mt-14'>
            독서 리뷰 작성하기
          </button>
        </div>
      </div>
    );
  }
  return (
    // TODO (유진) 데이터 받아서 변경할 예정
    <div className='flex flex-col'>
      <p className='font-bold mb-1 px-8'>아직 작성하지 않은 리뷰가 있어요!</p>
      <div className='flex items-center -space-x-2'>
        <button className='w-10 h-10 rounded-full border flex items-center justify-center'>
          <SlidePrevIcon className='w-6 h-6' />
        </button>
        <div className='flex flex-col w-[400px] h-[250px] bg-[#F6F6F6] p-5'>
          <div>
            <h3 className='text-xl font-bold'>
              디 에션셜: 한강 (무선 보급판판)
            </h3>
            <p>저자 한강</p>
            <p>출판 문학동네</p>
            <p>발행일 2023.06.01</p>
            <p>평점 ⭐⭐⭐⭐ 4.2 </p>
          </div>
          <button className='h-12 px-7 py-4 bg-[#C5C5C5] font-bold mt-10'>
            독서 리뷰 작성하기
          </button>
        </div>

        <button className='w-10 h-10 rounded-full border flex items-center justify-center'>
          <SlideNextIcon className='w-6 h-6' />
        </button>
      </div>
    </div>
  );
}
