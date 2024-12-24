import { fetchAPIClient } from '@/lib/fetchAPI.client';

export const toggleReviewLike = async (reviewId: number) => {
  const res = await fetchAPIClient('/api/review/like', 'POST', { reviewId });
  if (res.code !== 'SUCCESS') {
    throw new Error(`Failed to like review ${res.message}`);
  }
};
