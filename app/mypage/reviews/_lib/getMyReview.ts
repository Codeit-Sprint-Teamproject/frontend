import { fetchAPIClient } from '@/lib/fetchAPI.client';
import { MyBookReview } from '@/types/review';

type BookReviews = {
  bookReviews: MyBookReview[];
  total: number;
};
export const getMyReview = async (page: number): Promise<BookReviews> => {
  const res = await fetchAPIClient(
    `/api/review/user/BOOK?page=${page}&size=3`,
    'GET',
  );
  if (res.code === 'SUCCESS') {
    return res.result;
  }
  throw new Error('Failed to fetch my reading reviews');
};
