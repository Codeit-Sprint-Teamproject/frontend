import { fetchAPIClient } from '@/lib/fetchAPI.client';

export const checkCurrentPassword = async (password: string) => {
  const res = await fetchAPIClient('/api/auths/password/check', 'POST', {
    password,
  });
  if (res.code === 'PASSWORD_MISMATCHED') {
    throw new Error('현재 비밀번호가 일치하지 않습니다.');
  }
  if (res.error) {
    const errorMessage = res.error.message || '{}';
    const parsedError = JSON.parse(errorMessage);

    if (parsedError.code === 'INVALID_REQUEST') {
      throw new Error('입력하신 현재 비밀번호가 올바르지 않습니다.');
    }
    throw new Error(
      parsedError.message || '비밀번호 확인 중 오류가 발생했습니다.',
    );
  }
  return res;
};
