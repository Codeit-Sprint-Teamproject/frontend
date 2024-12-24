'use server';

import { fetchAPIServer } from '@/lib/fetchAPI.server';

export const getMeetingDetails = async (gatheringId: number) => {
  const endpoint = `/api/gatheringSearch/${gatheringId}`;
  const method = 'GET';

  const data = await fetchAPIServer(endpoint, method);

  if (data?.error) {
    throw new Error(data.error.message || 'Failed to fetch meeting detail');
  }

  return data;
};

export const getMeetingInfo = async (gatheringId: number) => {
  const endpoint = `/api/gatheringSearch/${gatheringId}/introduce`;
  const method = 'GET';

  const data = await fetchAPIServer(endpoint, method);

  if (data?.error) {
    throw new Error(data.error.message || 'Failed to fetch meeting detail');
  }

  return data;
};
