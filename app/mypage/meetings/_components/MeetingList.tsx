'use client';

import { useState } from 'react';
import { DefaultError, useQuery } from '@tanstack/react-query';
import {
  getActiveMeetings,
  getCompletedMeetings,
  getMeetingCounts,
} from '../_lib/mymeetings';
import Meeting from './Meeting';
import Pagination from './Pagination';
import { useTabContext } from './TabContext';
import { MyMeetingCount, MyMeetingList } from '@/types/meeting';

type Tab = 'active' | 'completed' | 'created' | 'bookmark';
const SIZE = 3;
const countKeyMap: Record<Tab, keyof MyMeetingCount> = {
  active: 'participatingCount',
  completed: 'completedCount',
  created: 'myCreatedCount',
  bookmark: 'myWishedCount',
};

export default function MeetingList() {
  const [page, setPage] = useState(0);
  const { tab } = useTabContext();

  const getMeetings = (page: number, size: number) => {
    switch (tab) {
      case 'active':
        return getActiveMeetings(page, size);
      case 'completed':
        return getCompletedMeetings(page, size);
      default:
        throw new Error('Invalid Tab');
    }
  };
  const { data: total, isLoading: isCountLoading } = useQuery<
    MyMeetingCount,
    DefaultError,
    number
  >({
    queryKey: ['mypage', 'meetings', tab, 'counts'],
    queryFn: getMeetingCounts,
    select: (cnt) => cnt[countKeyMap[tab]] || 0,
  });
  const { isLoading: isMeetingsLoading, data: meetings } = useQuery<
    MyMeetingList[]
  >({
    queryKey: ['mypage', 'meetings', tab, page],
    queryFn: () => getMeetings(page, SIZE),
    enabled: !!tab,
  });

  if (isCountLoading || isMeetingsLoading) return <p>Loading...</p>;
  if (!meetings?.length) return <p>모임이 없습니다.</p>;
  const totalPage = Math.ceil((total as number) / SIZE);

  return (
    <div className='relative min-h-[900px]'>
      <div className='flex flex-col gap-[15px] mt-5'>
        {meetings?.map((meeting) => (
          <Meeting key={meeting.id} meeting={meeting} />
        ))}
      </div>
      <Pagination page={page} totalPage={totalPage} onPageChange={setPage} />
    </div>
  );
}
