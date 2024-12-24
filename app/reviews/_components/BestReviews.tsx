'use client';

import { useState } from 'react';
import BestReviewCard from './BestReviewCard';
import SlideNextIcon from '@/components/common/icons/SlideNextIcon';
import SlidePrevIcon from '@/components/common/icons/SlidePrevIcon';
import { useReviewQuery } from '@/hooks/useReviewQuery';

export default function BestReviews() {
  const [index, setIndex] = useState(0);
  const { reviews } = useReviewQuery();

  const handlePrev = () => {
    setIndex(index - 1);
  };
  const handleNext = () => {
    setIndex(index + 1);
  };

  if (!reviews) return null;
  const { bookReviews } = reviews;
  const total = bookReviews?.length || 0;

  return (
    <div className='w-full'>
      <h3 className='font-bold mb-4'>모읽러가 선정한 Best 리뷰</h3>
      <div>
        {bookReviews && bookReviews?.length > 0 && (
          <BestReviewCard review={bookReviews?.[index]} />
        )}
      </div>
      <div className='flex justify-center gap-6 mx-auto mt-4'>
        <button onClick={handlePrev} disabled={!index}>
          <SlidePrevIcon className='w-6 h-6' />
        </button>
        <div>
          <span className='font-bold'>{index + 1} </span> / <span>{total}</span>
        </div>
        <button onClick={handleNext} disabled={index === total - 1}>
          <SlideNextIcon className='w-6 h-6' />
        </button>
      </div>
    </div>
  );
}
