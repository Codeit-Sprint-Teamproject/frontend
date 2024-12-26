import { fetchAPIServer } from '@/lib/fetchAPI.server';
import { BookReviewByTitle } from '@/types/book';

const size = 3;
export type BookReviewListResponse = {
  bookReviews: BookReviewByTitle[];
  total: number;
};
export const getBookReviewsServer = async (
  page: number,
  title: string,
): Promise<BookReviewListResponse> => {
  const res = await fetchAPIServer(
    `/api/review/search?type=BOOK_NAME&searchParam=${title}&page=${page}&size=${size}`,
    'GET',
  );
  if (res.code === 'SUCCESS') {
    return res.result;
  }
  throw new Error(`failed to fetch book reviews : ${res.message}`);
};
