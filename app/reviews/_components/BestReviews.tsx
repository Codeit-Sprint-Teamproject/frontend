'use client';

import { useState } from 'react';
import BestReviewCard from './BestReviewCard';
import SlideNextIcon from '@/components/common/icons/SlideNextIcon';
import SlidePrevIcon from '@/components/common/icons/SlidePrevIcon';
import { useReviewQuery } from '@/hooks/useReviewQuery';

export default function BestReviews() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { reviews } = useReviewQuery();

  const handlePrev = () => {
    setCurrentIndex(currentIndex - 1);
  };
  const handleNext = () => {
    setCurrentIndex(currentIndex + 1);
  };

  if (!reviews) return <p>Best 리뷰가 없습니다.</p>;
  const { bookReviews } = reviews;
  const total = bookReviews?.length || 0;

  return (
    <div className='w-full'>
      <h3 className='text-lg font-bold mb-4'>모읽러가 선정한 Best 리뷰</h3>
      <div>
        {bookReviews && bookReviews?.length > 0 && (
          <BestReviewCard review={bookReviews[currentIndex]} />
        )}
      </div>
      <div className='flex justify-center items-center gap-6 mx-auto mt-4'>
        <button onClick={handlePrev} disabled={!currentIndex}>
          <SlidePrevIcon className='w-6 h-6' />
        </button>
        <div className='text-xs'>
          <span className='font-bold'>{currentIndex + 1} </span> /{' '}
          <span>{total}</span>
        </div>
        <button onClick={handleNext} disabled={currentIndex === total - 1}>
          <SlideNextIcon className='w-6 h-6' />
        </button>
      </div>
    </div>
  );
}
