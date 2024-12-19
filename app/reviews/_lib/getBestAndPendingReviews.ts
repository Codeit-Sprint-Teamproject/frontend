import { fetchAPIClient } from '@/lib/fetchAPI.client';
import { BestBookReview, PendingBookReview } from '@/types/book';

export type ReviewePageResponse = {
  bookReviews?: BestBookReview[];
  bookResponseList: PendingBookReview[];
  total?: number;
};

export const getBestAndPendingReviews =
  async (): Promise<ReviewePageResponse> => {
    const res = await fetchAPIClient('/api/review', 'GET');
    if (res.code === 'SUCCESS') {
      return res.result;
    }
    throw new Error(`failed to fetch review page ${res.code}-${res.message}`);
  };
