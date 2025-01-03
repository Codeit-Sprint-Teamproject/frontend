import { fetchAPIClient } from '@/lib/fetchAPI.client';
import { UserProfile } from '@/types/user';
import Cookies from 'js-cookie';

export const updateProfile = async (
  formData: FormData,
): Promise<UserProfile> => {
  const res = await fetchAPIClient('/api/auths/edit/user', 'PUT', formData);

  if (res.code === 'SUCCESS') {
    const { userId, userName, email, profile, roles, token } = res.result;
    Cookies.set('token', token);
    return { userId, userName, email, profile, roles };
  }
  throw new Error('failed to updated profile');
};
