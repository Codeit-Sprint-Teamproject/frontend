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

export const postJoinMeeting = async (gatheringId: number) => {
  const endpoint = `/api/gathering/${gatheringId}/join`;
  const method = 'POST';

  try {
    const data = await fetchAPIServer(endpoint, method);

    if (data?.error) {
      throw data.error;
    }

    return data;
  } catch (error: unknown) {
    if (error instanceof Error && error.message.includes('ALREADY_JOINED')) {
      throw new Error('이미 이 모임에 참여 중입니다.');
    }

    throw error;
  }
};

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
    if (error instanceof Error && error.message.includes('ALREADY_JOINED')) {
      throw new Error('이미 찜한 모임입니다.');
    }

    throw error;
  }
};
