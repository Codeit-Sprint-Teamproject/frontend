import { fetchAPIClient } from '@/lib/fetchAPI.client';
import { SearchedBook } from '@/types/book';

export const searchBookByName = async (
  title: string,
): Promise<SearchedBook[]> => {
  const res = await fetchAPIClient(
    `/api/book/title-search?searchWord=${title}`,
    'GET',
  );
  if (res.code === 'SUCCESS') {
    return res.result;
  }
  const errorMessage = res.error?.message;
  const parsedMessage = JSON.parse(errorMessage);
  console.log('parsed', parsedMessage);
  if (parsedMessage.code === 'INVALID_SEARCH_WORD') {
    throw new Error('책의 제목을 3자 이상 입력해주세요');
  }
  throw new Error(
    '현재 검색 기능에 문제가 발생했습니다. 잠시 후 다시 시도해 주세요.',
  );
};
