'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getBookReviews } from '../_lib/getBookReviews';
import ReviewCard from './ReviewCard';
import Pagination from '@/components/Pagination';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const SIZE = 3;

export default function BookReviewList({ title }: { title?: string }) {
  const [page, setPage] = useState(0);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { data: reviews } = useQuery({
    queryKey: ['reviews', 'book', title, page],
    queryFn: () => getBookReviews(title || '', page),
    enabled: !!title,
    staleTime: 60 * 1000,
  });
  const totalPage = Math.ceil((reviews?.total || 0) / SIZE);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', String(newPage));
    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <aside className='relative w-[343px] h-[590px] px-7 py-5 border'>
      <p className='text-sm font-bold'>
        <span className='text-customGreen-500'>{title}</span>의 리뷰 모아보기
      </p>
      <ul className='w-full h-[498px]'>
        {reviews?.bookReviews.map((review) => (
          <ReviewCard key={review.id} review={review} bookTitle={title || ''} />
        ))}
      </ul>
      <Pagination
        page={page}
        totalPage={totalPage}
        onPageChange={handlePageChange}
        className='flex items-center justify-center mt-2.5'
      />
    </aside>
  );
}
