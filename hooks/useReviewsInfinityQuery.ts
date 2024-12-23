import { useInfiniteQuery } from '@tanstack/react-query';
import {
  BookReviewResponse,
  getFilteredBookReviews,
} from '@/app/reviews/_lib/getFilteredBookReviews';
import { BookReviewFilter } from '@/types/review';

export const useReviewsInfinityQuery = (filter: BookReviewFilter) => {
  return useInfiniteQuery<BookReviewResponse, Error>({
    queryKey: ['reviews', filter],
    queryFn: ({ pageParam = 0 }) =>
      getFilteredBookReviews(filter, pageParam as number),
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.hasNext) {
        return allPages.length;
      }
      return undefined;
    },
    staleTime: 30 * 1000,
    initialPageParam: 0,
  });
};
