import { fetchAPIClient } from '@/lib/fetchAPI.client';

export const completeReading = async (id: number) => {
  const res = await fetchAPIClient(`/api/gathering/${id}/read-book`, 'POST');
  if (res.error) {
    const errorMessage = res.error.message || '{}';
    const parsedError = JSON.parse(errorMessage);

    if (parsedError.code === 'ALREADY_READING_BOOK') {
      throw new Error('이미 독서를 완료했습니다.');
    }
    if (parsedError.code === 'SUPPORTED_TOKEN') {
      throw new Error('인증에 실패했습니다. 다시 로그인해주세요.');
    }
    throw new Error('Failed to complete reading');
  }
  return res;
};
