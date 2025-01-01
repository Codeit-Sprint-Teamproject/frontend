'use client';

import { useState } from 'react';
import { Rating } from 'react-simple-star-rating';
import NoPendingReviewBox from './NoPendingReviewBox';
import SlideNextIcon from '@/components/common/icons/SlideNextIcon';
import SlidePrevIcon from '@/components/common/icons/SlidePrevIcon';
import { useBestReviewQuery } from '@/hooks/useBestReviewQuery';
import Image from 'next/image';
import Link from 'next/link';

export default function PendingReviewBox() {
  const { reviews } = useBestReviewQuery();
  const [currentIndex, setCurrentIndex] = useState(0);
  const handlePrev = () => {
    setCurrentIndex((prev) => prev - 1);
  };
  const handleNext = () => {
    setCurrentIndex((prev) => prev + 1);
  };
  if (!reviews) return null;
  const { bookResponseList } = reviews;

  if (!bookResponseList?.length) {
    return <NoPendingReviewBox />;
  }
  const { title, author, publisher, publisherDate, star, image } =
    bookResponseList[currentIndex];
  return (
    <div className='flex flex-col p-5 border rounded-md'>
      <p className='text-lg font-bold text-black mb-2.5'>
        아직 작성하지 않은 리뷰가 있어요!
      </p>
      <div className='flex flex-col w-[344px] p-2.5 border rounded-sm'>
        <div className='flex gap-2.5'>
          <Image
            src={image}
            width={90}
            height={135}
            className='w-[90px] h-[135px]'
            alt='책 표지'
          />
          <div className='text-customGrey-800'>
            <h3>{title}</h3>
            <p className='text-sm'>
              저자 <span>{author}</span>
            </p>
            <p className='text-sm'>
              출판 <span>{publisher}</span>
            </p>
            <p className='text-sm'>
              발행일 <span>{publisherDate}</span>
            </p>
            <div className='flex items-center gap-2 text-sm'>
              평점
              <div className='flex items-center mb-1'>
                <Rating
                  size={14}
                  readonly
                  initialValue={star / 2}
                  fillColor='#262626'
                  SVGstyle={{ display: 'inline' }}
                />
                <span className='pt-1'>{star}</span>
              </div>
            </div>
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
        <button
          className='w-6 h-6 rounded-full border flex items-center justify-center shadow-button'
          onClick={handlePrev}
          disabled={!currentIndex}
        >
          <SlidePrevIcon className='w-3.5 h-3.5' />
        </button>
        <p className='text-sm text-customGrey-800'>
          작성하지 않은 리뷰{' '}
          <span className='font-bold'>{currentIndex + 1}</span> /{' '}
          {bookResponseList?.length}
        </p>
        <button
          className='w-6 h-6 rounded-full border flex items-center justify-center shadow-button'
          onClick={handleNext}
          disabled={currentIndex === bookResponseList.length - 1}
        >
          <SlideNextIcon className='w-3.5 h-3.5' />
        </button>
      </div>
    </div>
  );
}
