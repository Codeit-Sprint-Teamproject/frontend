'use server';

import { fetchAPIServer } from '@/lib/fetchAPI.server';

export async function fetchMeetingDetails(gatheringId: number) {
  const endpoint = `/api/gatheringSearch/${gatheringId}`;
  const method = 'GET';

  const data = await fetchAPIServer(endpoint, method);

  if (data?.error) {
    throw new Error(data.error.message || 'Failed to fetch meeting detail');
  }

  return data;
}
