import { fetchAPIClient } from '@/lib/fetchAPI.client';
import { MyMeetingList } from '@/types/meeting';

export const getActiveMeetings = async () => {
  const res = await fetchAPIClient(
    '/api/gatheringSearch/participating?page=0&size=3&gatheringUserStatus=PARTICIPATING',
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
