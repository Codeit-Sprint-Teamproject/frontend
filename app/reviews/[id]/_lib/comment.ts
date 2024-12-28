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
export const updateComment = async (
  commentId: number,
  reviewId: number,
  content: string,
) => {
  return await fetchAPIClient(`/api/review/${commentId}/comment/edit`, 'PUT', {
    reviewId,
    content,
    parent: 0,
  });
};
