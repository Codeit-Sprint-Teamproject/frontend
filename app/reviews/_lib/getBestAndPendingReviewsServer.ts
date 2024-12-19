import { fetchAPIServer } from '@/lib/fetchAPI.server';
import { BestBookReview, PendingBookReview } from '@/types/book';

export type ReviewePageResponse = {
  bookReviews?: PendingBookReview[];
  bookResponseList: BestBookReview[];
  total?: number;
};

export const getBestAndPendingReviewsServer =
  async (): Promise<ReviewePageResponse> => {
    const res = await fetchAPIServer('/api/review', 'GET');
    if (res.code === 'SUCCESS') {
      return res.result;
    }
    throw new Error(`failed to fetch review page ${res.code}-${res.message}`);
  };
