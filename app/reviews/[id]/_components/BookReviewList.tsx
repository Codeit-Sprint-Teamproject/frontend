'use client';

import { useQuery } from '@tanstack/react-query';
import { getBookReviews } from '../_lib/getBookReviews';
import ReviewCard from './ReviewCard';

export default function BookReviewList({ title }: { title?: string }) {
  const { data: reviews } = useQuery({
    queryKey: ['reviews', 'book', title, 0],
    queryFn: () => getBookReviews(title as string, 0),
    enabled: !!title,
    staleTime: 60 * 1000,
  });

  return (
    <aside className='relative w-[343px] h-[590px] px-7 py-5 border'>
      <p className='text-sm font-bold'>
        <span className='text-customGreen-500'>{title}</span>의 리뷰 모아보기
      </p>
      <ul className='w-full h-[498px]'>
        {reviews?.bookReviews.map((review, i) => (
          <ReviewCard key={i} review={review} />
        ))}
      </ul>
    </aside>
  );
}
