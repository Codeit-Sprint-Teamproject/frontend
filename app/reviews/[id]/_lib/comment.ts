import { fetchAPIClient } from '@/lib/fetchAPI.client';

export const addComment = async (reviewId: number, content: string) => {
  return await fetchAPIClient('/api/review/comment/create', 'POST', {
    reviewId,
    content,
    parent: 0,
  });
};
