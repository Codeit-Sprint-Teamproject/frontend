import { fetchAPIClient } from '@/lib/fetchAPI.client';
import { BookReview } from '@/types/book';
import { BookReviewFilter } from '@/types/review';

export type BookReviewResponse = {
  bookReviews: BookReview[];
  hasNext?: boolean;
};

export const getFilteredBookReviews = async (
  filter: BookReviewFilter,
  pageParam: number,
): Promise<BookReviewResponse> => {
  const res = await fetchAPIClient(
    `/api/review/search/tag?tag=${filter}&page=${pageParam}`,
    'GET',
  );
  if (res.code === 'SUCCESS') {
    return res.result;
  }
  throw new Error(`Failed to fetch book reviews: ${res.message}`);
};
