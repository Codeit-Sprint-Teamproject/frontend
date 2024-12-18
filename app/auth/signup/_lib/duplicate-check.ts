import { fetchAPIClient } from '@/lib/fetchAPI.client';

export const checkDuplicate = async (
  type: 'email' | 'userName',
  value: string,
) => {
  try {
    const response = await fetchAPIClient(
      `/api/auths/check/${type}?param=${value}`,
      'GET',
    );
    console.log(response);
    if (response.code === 'SUCCESS') {
      return { isDuplicate: false, message: '사용 가능합니다.' };
    } else if (response.code === 'DUPLICATE_EMAIL') {
      return { isDuplicate: true, message: '이미 사용 중인 이메일입니다.' };
    } else if (response.code === 'DUPLICATE_USERNAME') {
      return {
        isDuplicate: true,
        message: '이미 사용 중인 사용자 이름입니다.',
      };
    } else if (response.code === 'INVALID_REQUEST') {
      return {
        isDuplicate: true,
        message: '올바른 이메일을 입력해 주세요.',
      };
    }

    return { isDuplicate: false, message: '예상치 못한 상태입니다.' };
  } catch (error) {
    console.error('Duplicate check failed:', error);
    return { isDuplicate: false, message: '네트워크 오류가 발생했습니다.' };
  }
};
