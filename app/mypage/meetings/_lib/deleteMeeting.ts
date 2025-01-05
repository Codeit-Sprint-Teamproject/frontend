import { fetchAPIClient } from '@/lib/fetchAPI.client';

export const deleteMeeting = async (id: number) => {
  return await fetchAPIClient(`/api/gathering/${id}`, 'DELETE');
};
