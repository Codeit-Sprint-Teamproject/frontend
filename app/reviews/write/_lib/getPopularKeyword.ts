import { fetchAPIClient } from '@/lib/fetchAPI.client';

type Keyword = { id: number; title: string };

export const getPopularKeyword = async (): Promise<Keyword[]> => {
  const res = await fetchAPIClient('/api/review/recommendedKeywords', 'GET');
  if (res.code === 'SUCCESS') {
    return res.result;
  }
  throw new Error('Failed to fetch popular keywords');
};
