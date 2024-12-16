'use client';

import { useQuery } from '@tanstack/react-query';
import { getActiveMeetings, getCompletedMeetings } from '../_lib/mymeetings';
import Meeting from './Meeting';
import { useTabContext } from './TabContext';

export default function MeetingList() {
  const getMeetings = () => {
    switch (tab) {
      case 'active':
        return getActiveMeetings;
      case 'completed':
        return getCompletedMeetings;
      default:
        throw new Error('Invalid Tab');
    }
  };
  const { tab } = useTabContext();
  const { isLoading, data: meetings = [] } = useQuery({
    queryKey: ['mypage', 'meetings', tab],
    queryFn: getMeetings(),
    enabled: !!tab,
  });

  if (isLoading) return <p>Loading...</p>;
  if (!meetings?.length) return <p>모임이 없습니다.</p>;
  return (
    <div className='flex flex-col gap-[15px] mt-[34px]'>
      {meetings?.map((meeting) => (
        <Meeting key={meeting.id} meeting={meeting} />
      ))}
    </div>
  );
}
