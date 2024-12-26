import { fetchAPIClient } from '@/lib/fetchAPI.client';
import { BookDetail, BookReviewDetail } from '@/types/book';
import { BookReviewComment } from '@/types/review';

export type ReviewDetailResponse = {
  bookReview?: BookReviewDetail;
  bookResponse: BookDetail;
  commentList?: BookReviewComment[];
};

export const getReviewDetail = async (
  id: number,
): Promise<ReviewDetailResponse> => {
  const res = await fetchAPIClient(`/api/review/${id}/detail`, 'GET');
  if (res.code === 'SUCCESS') {
    return res.result;
  }
  throw new Error(`failed to fetch review detail : ${res.message}`);
};
