import { fetchAPIClient } from '@/lib/fetchAPI.client';
import { MyMeetingCount, MyMeetingList } from '@/types/meeting';

export const getActiveMeetings = async (page: number, size: number) => {
  const res = await fetchAPIClient(
    `/api/gatheringSearch/participating?page=${page}&size=${size}&gatheringStatus=ACTIVE&gatheringUserStatus=PARTICIPATING`,
    'GET',
  );
  if (res.code === 'SUCCESS') {
    return (res.result.gatheringResponses as MyMeetingList[]) || [];
  }
  throw new Error(`Failed fetch active meetings ${res.code}-${res.message}`);
};

export const getCompletedMeetings = async (page: number, size: number) => {
  const res = await fetchAPIClient(
    `/api/gatheringSearch/participating?page=${page}&size=${size}&gatheringStatus=COMPLETED&gatheringUserStatus=NOT_PARTICIPATING`,
    'GET',
  );
  if (res.code === 'SUCCESS') {
    return (res.result.gatheringResponses as MyMeetingList[]) || [];
  }
  throw new Error(`Failed fetch active meetings ${res.code}-${res.message}`);
};

export const getMeetingCounts = async () => {
  const res = await fetchAPIClient('/api/gathering/mypage-count', 'GET');
  if (res.code === 'SUCCESS') {
    return res.result as MyMeetingCount;
  }
  throw new Error('Failed fetch meeting counts');
};
export const getCreatedMeetings = async (page: number, size: number) => {
  const res = await fetchAPIClient(
    `/api/gatheringSearch/my?page=${page}&size=${size}`,
    'GET',
  );
  if (res.code === 'SUCCESS') {
    return (res.result.gatheringResponses as MyMeetingList[]) || [];
  }
  throw new Error('Failed fetch meeting counts');
};
export const getBookmarkedMeetings = async (page: number, size: number) => {
  const res = await fetchAPIClient(
    `/api/gatheringSearch/wishes?page=${page}&size=${size}`,
    'GET',
  );
  if (res.code === 'SUCCESS') {
    return (res.result.gatheringResponses as MyMeetingList[]) || [];
  }
  throw new Error('Failed fetch meeting counts');
};
