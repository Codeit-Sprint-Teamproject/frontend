'use client';

import useUserStore from '@/store/userStore';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

export const Logout = () => {
  const router = useRouter();
  const clearUser = useUserStore((state) => state.clearUser);

  const clearAndRedirect = () => {
    clearUser();
    Cookies.remove('token');
    router.push('/');
  };

  return clearAndRedirect;
};
