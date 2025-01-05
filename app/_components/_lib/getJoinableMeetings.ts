'use server';

import { fetchAPIServer } from '@/lib/fetchAPI.server';

export const getJoinableMeetings = async () => {
  const endpoint = `/api/gatheringSearch/joinable?page=0&today=true`;
  const method = 'GET';

  const data = await fetchAPIServer(endpoint, method);

  if (data?.error) {
    throw new Error(data.error.message || 'Failed to fetch meeting detail');
  }

  return data.result.gatheringResponses;
};
