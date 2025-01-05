import { fetchAPIClient } from '@/lib/fetchAPI.client';

export const unlikeMeeting = async (id: number) => {
  return await fetchAPIClient(`/api/gathering/${id}/wish`, 'POST');
};
