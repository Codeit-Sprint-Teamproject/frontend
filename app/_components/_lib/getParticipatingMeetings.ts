'use server';

import { fetchAPIServer } from '@/lib/fetchAPI.server';

export const getParticipatingMeetings = async () => {
  const endpoint = `/api/gatheringSearch/participating?page=0&size=3&gatheringUserStatus=PARTICIPATING`;
  const method = 'GET';

  const data = await fetchAPIServer(endpoint, method);

  if (data?.error) {
    throw new Error(data.error.message || 'Failed to fetch meeting detail');
  }

  return data.result.gatheringResponses;
};
