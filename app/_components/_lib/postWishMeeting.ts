'use server';

import { fetchAPIServer } from '@/lib/fetchAPI.server';

export const postWishMeeting = async (gatheringId: number) => {
  const endpoint = `/api/gathering/${gatheringId}/wish`;
  const method = 'POST';

  try {
    const data = await fetchAPIServer(endpoint, method);

    if (data?.error) {
      throw data.error;
    }

    return data;
  } catch (error: unknown) {
    throw error;
  }
};
