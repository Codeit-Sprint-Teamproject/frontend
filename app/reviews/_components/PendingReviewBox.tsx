'use client';

import NoPendingReviewBox from './NoPendingReviewBox';
import SlideNextIcon from '@/components/common/icons/SlideNextIcon';
import SlidePrevIcon from '@/components/common/icons/SlidePrevIcon';
import { useBestReviewQuery } from '@/hooks/useBestReviewQuery';
import Image from 'next/image';
import Link from 'next/link';

export default function PendingReviewBox() {
  const { reviews } = useBestReviewQuery();
  if (!reviews) return null;
  const { bookResponseList } = reviews;

  if (!bookResponseList?.length) {
    return <NoPendingReviewBox />;
  }
  return (
    // TODO (유진) 데이터 받아서 변경할 예정
    <div className='flex flex-col p-5 border'>
      <p className='text-lg font-bold mb-2.5'>
        아직 작성하지 않은 리뷰가 있어요!
      </p>
      <div className='flex flex-col w-[344px] p-2.5 border rounded-sm'>
        <div className='flex gap-2.5'>
          <Image src='/book.png' width={90} height={135} alt='책 표지' />
          <div>
            <h3>디 에션셜: 한강 (무선 보급판판)</h3>
            <p>저자 한강</p>
            <p>출판 문학동네</p>
            <p>발행일 2023.06.01</p>
            <p>평점 ⭐⭐⭐⭐ 4.2 </p>
          </div>
        </div>
        <Link
          href='/reviews/write'
          className='h-12 p-3 text-center bg-customGreen-50 text-customGreen-600 rounded-sm mt-10'
        >
          리뷰 작성하기
        </Link>
      </div>
      <div className='flex justify-center items-center gap-2 mt-[18px]'>
        <button className='w-6 h-6 rounded-full border flex items-center justify-center'>
          <SlidePrevIcon className='w-3.5 h-3.5' />
        </button>
        <p className='text-sm text-customGrey-800'>
          작성하지 않은 리뷰 <span className='font-bold'>1</span> / 3{' '}
        </p>
        <button className='w-6 h-6 rounded-full border flex items-center justify-center'>
          <SlideNextIcon className='w-3.5 h-3.5' />
        </button>
      </div>
    </div>
  );
}
