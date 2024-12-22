import { fetchAPIServer } from '@/lib/fetchAPI.server';
import { BookReview } from '@/types/book';
import { BookReviewFilter } from '@/types/review';

type BookReviewResponse = {
  bookReviews: BookReview[];
  hasNext?: boolean;
};
const SIZE = 2;

export const getFilteredBookReviewsServer = async (
  filter: BookReviewFilter,
  pageParam: number,
): Promise<BookReviewResponse> => {
  const res = await fetchAPIServer(
    `/api/review/search/tag?tag=${filter}&page=${pageParam}&size=${SIZE}`,
    'GET',
  );
  if (res.code === 'SUCCESS') {
    return res.result;
  }
  throw new Error(`Failed to fetch book reviews: ${res.message}`);
};
