import { fetchAPIClient } from '@/lib/fetchAPI.client';
import { MyMeetingList } from '@/types/meeting';

export const getActiveMeetings = async () => {
  const res = await fetchAPIClient(
    `/api/gatheringSearch/participating?&gatheringUserStatus=PARTICIPATING`,
    'GET',
  );
  if (res.code === 'SUCCESS') {
    return res.result.gatheringResponses as MyMeetingList[];
  }
  throw new Error(`Failed fetch my active meetings`);
};
