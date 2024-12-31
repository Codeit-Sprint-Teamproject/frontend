import { fetchAPIClient } from '@/lib/fetchAPI.client';
import { MyMeetingBookReview } from '@/types/book';

export const getMyMeetingBooks = async (): Promise<MyMeetingBookReview[]> => {
  const res = await fetchAPIClient('/api/review/user/gathering', 'GET');
  if (res.code === 'SUCCESS') {
    return res.result || [];
  }
  throw new Error('Failed to fetch book list');
};
