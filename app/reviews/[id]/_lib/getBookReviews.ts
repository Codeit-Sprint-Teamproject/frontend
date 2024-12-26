import { fetchAPIClient } from '@/lib/fetchAPI.client';
import { BookReviewByTitle } from '@/types/book';

const size = 3;
export type BookReviewListResponse = {
  bookReviews: BookReviewByTitle[];
  total: number;
};
export const getBookReviews = async (
  title: string,
  page: number,
): Promise<BookReviewListResponse> => {
  const res = await fetchAPIClient(
    `/api/review/search?type=BOOK_NAME&searchParam=${title}&page=${page}&size=${size}`,
    'GET',
  );
  if (res.code === 'SUCCESS') {
    return res.result;
  }
  throw new Error(`failed to fetch book reviews : ${res.message}`);
};
