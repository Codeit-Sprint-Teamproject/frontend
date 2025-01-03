import React from 'react';
import StarIcon from '@/components/common/icons/Star';

export default function StarRating({ rating }: { rating: number }) {
  const adjustedRating = Math.floor((rating / 10) * 5);

  return (
    <div className='flex items-center'>
      {Array.from({ length: 5 }, (_, index) => (
        <StarIcon
          key={index}
          fill={index < adjustedRating ? '#262626' : 'none'}
          className='w-[14px] h-[14px]'
          stroke='black'
        />
      ))}
      <span className='text-[12px] text-customGrey-800 font-normal ml-[2px]'>
        {rating.toFixed(1)}
      </span>
    </div>
  );
}
