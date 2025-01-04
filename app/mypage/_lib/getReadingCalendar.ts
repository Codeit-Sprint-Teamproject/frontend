import { fetchAPIClient } from '@/lib/fetchAPI.client';
import { ReadingCalendar } from '@/types/book';

export const getReadingCalendar = async (
  yearMonth: string,
): Promise<ReadingCalendar> => {
  const res = await fetchAPIClient(
    `/api/auths/myBookCalendar?yearMonth=${yearMonth}`,
    'GET',
  );
  if (res.code === 'SUCCESS') {
    return res.result;
  }
  throw new Error('Failed to reading calendar');
};
