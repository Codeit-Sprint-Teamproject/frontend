import { fetchAPIServer } from '@/lib/fetchAPI.server';
import { BookDetail, BookReviewDetail } from '@/types/book';
import { BookReviewComment } from '@/types/review';

type ReviewDetailResponse = {
  bookReview?: BookReviewDetail;
  bookResponse: BookDetail;
  commentList?: BookReviewComment[];
};

export const getReviewDetailServer = async (
  id: number,
): Promise<ReviewDetailResponse> => {
  const res = await fetchAPIServer(`/api/review/${id}/detail`, 'GET');
  if (res.code === 'SUCCESS') {
    return res.result;
  }
  throw new Error(`failed to fetch review detail : ${res.message}`);
};
