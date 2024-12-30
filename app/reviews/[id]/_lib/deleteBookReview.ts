import { fetchAPIClient } from '@/lib/fetchAPI.client';

export const deleteBookReview = async (id: number) => {
  return await fetchAPIClient(`/api/review/${id}?type=BOOK`, 'DELETE');
};
