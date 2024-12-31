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
  throw new Error(
    '현재 검색 기능에 문제가 발생했습니다. 잠시 후 다시 시도해 주세요.',
  );
};
