'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getMyReview } from '../_lib/getMyReview';
import Review from './Review';
import Pagination from '@/components/Pagination';

const SIZE = 3;

export default function ReviewList() {
  const [page, setPage] = useState(0);
  const { isLoading, data: reviews } = useQuery({
    queryKey: ['mypage', 'reviews', page],
    queryFn: () => getMyReview(page),
  });
  if (isLoading) return <p>Loading...</p>;
  const totalPage = Math.ceil((reviews?.total || 0) / SIZE);

  return (
    <div className='w-full h-full relative'>
      <ul>
        {reviews?.bookReviews?.map((review) => (
          <Review key={review.id} review={review} />
        ))}
      </ul>
      <Pagination
        page={page}
        totalPage={totalPage}
        onPageChange={setPage}
        className='flex justify-center gap-2 absolute -bottom-[72px] left-1/3'
      />
    </div>
  );
}
