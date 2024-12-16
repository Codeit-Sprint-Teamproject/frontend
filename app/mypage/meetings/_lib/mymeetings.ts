import { fetchAPIClient } from '@/lib/fetchAPI.client';
import { MyMeetingCount, MyMeetingList } from '@/types/meeting';

export const getActiveMeetings = async (page: number, size: number) => {
  const res = await fetchAPIClient(
    `/api/gatheringSearch/participating?page=${page}&size=${size}&gatheringUserStatus=PARTICIPATING`,
    'GET',
  );
  if (res.code === 'SUCCESS') {
    return res.result.gatheringResponses as MyMeetingList[];
  }
  throw new Error(`Failed fetch active meetings ${res.code}-${res.message}`);
};

export const getCompletedMeetings = async () => {
  const res = await fetchAPIClient(
    '/api/gatheringSearch/participating?page=0&size=3&gatheringStatus=COMPLETED',
    'GET',
  );
  if (res.code === 'SUCCESS') {
    return res.result.gatheringResponses as MyMeetingList[];
  }
  throw new Error(`Failed fetch active meetings ${res.code}-${res.message}`);
};

export const getMeetingCounts = async () => {
  const res = await fetchAPIClient('/api/gathering/mypage-count', 'GET');
  if (res.code === 'SUCCESS') {
    return res.result as MyMeetingCount;
  }
  throw new Error(`Failed fetch meeting counts ${res.code}-${res.message}`);
};
