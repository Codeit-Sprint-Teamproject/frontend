'use client';

import { useState } from 'react';
import Filter from './Filter';
import Review from './Review';
import InfiniteScroll from '@/components/InfiniteScroll';
import { useReviewsInfinityQuery } from '@/hooks/useReviewsInfinityQuery';
import { BookReviewFilter } from '@/types/review';

export default function ReviewList() {
  const [filter, setFilter] = useState<BookReviewFilter>('ALL');
  const [isOpen, setIsOpen] = useState(false);
  const { isLoading, data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useReviewsInfinityQuery(filter);

  const handleView = () => {
    if (!isFetchingNextPage && hasNextPage) {
      fetchNextPage();
    }
  };

  if (isLoading) return <p>Loading...</p>;
  const reviews = data?.pages.flatMap((page) => page.bookReviews) || [];

  return (
    <section>
      <Filter
        filter={filter}
        isOpen={isOpen}
        onFilterChange={(newFilter) => setFilter(newFilter)}
        onToggle={() => setIsOpen((prev) => !prev)}
      />
      <InfiniteScroll
        className='flex flex-col gap-7'
        isFetching={isFetchingNextPage}
        list={reviews}
        renderItem={(review) => <Review key={review.id} review={review} />}
        onView={handleView}
        hasMore={!!hasNextPage}
        emptyMessage={`${filter}에 해당하는 리뷰가 없습니다.`}
      />
    </section>
  );
}
