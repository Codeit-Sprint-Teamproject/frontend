import { fetchAPIClient } from '@/lib/fetchAPI.client';
import { UserProfile } from '@/types/user';

export const getProfile = async (): Promise<UserProfile> => {
  const res = await fetchAPIClient('/api/auths/myProfile', 'GET');
  if (res.code === 'SUCCESS') {
    const { userId, userName, email, profile, roles } = res.result;
    return { userId, userName, email, profile, roles };
  }
  throw new Error('Failed to fetch my profile');
};
