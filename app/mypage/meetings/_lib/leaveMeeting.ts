import { fetchAPIClient } from '@/lib/fetchAPI.client';

export const leaveMeeting = async (id: number) => {
  const res = await fetchAPIClient(`/api/gathering/${id}/leave`, 'POST', {
    gatheringUserStatus: 'PARTICIPATING',
  });
  return res;
};
