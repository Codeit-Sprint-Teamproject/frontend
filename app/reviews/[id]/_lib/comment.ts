import { fetchAPIClient } from '@/lib/fetchAPI.client';

export const addComment = async (reviewId: number, content: string) => {
  return await fetchAPIClient('/api/review/comment/create', 'POST', {
    reviewId,
    content,
    parent: 0,
  });
};
export const deleteComment = async (id: number) => {
  return await fetchAPIClient(`/api/review/${id}/comment`, 'DELETE');
};
