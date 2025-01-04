import { fetchAPIClient } from '@/lib/fetchAPI.client';

export const leaveMeeting = async (id: number) => {
  const res = await fetchAPIClient(`/api/gathering/${id}/leave`, 'POST', {
    gatheringUserStatus: 'PARTICIPATING',
  });
  if (res.error) {
    const errorMessage = res.error.message || '{}';
    const parsedError = JSON.parse(errorMessage);

    if (parsedError.code === 'USER_NOT_IN_CHALLENGE') {
      throw new Error(
        'You are not currently participating in the reading challenge.',
      );
    }
    if (parsedError.code === 'UNSUPPORTED_TOKEN') {
      throw new Error('Authentication failed. Please log in again.');
    }
    throw new Error('Failed to complete reading');
  }
  return res;
};
