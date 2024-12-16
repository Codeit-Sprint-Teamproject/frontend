'use client';

import { useState } from 'react';
import { DefaultError, useQuery } from '@tanstack/react-query';
import { getMeetingCounts } from '../_lib/mymeetings';
import Meeting from './Meeting';
import Pagination from './Pagination';
import { useTabContext } from './TabContext';
import { useMyMeetingQuery } from '@/hooks/useMyMeetingQuery';
import { MyMeetingCount } from '@/types/meeting';

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

  const { data: total, isLoading: isCountLoading } = useQuery<
    MyMeetingCount,
    DefaultError,
    number
  >({
    queryKey: ['mypage', 'meetings', tab, 'counts'],
    queryFn: getMeetingCounts,
    select: (cnt) => cnt[countKeyMap[tab]] || 0,
  });
  const { isMeetingsLoading, meetings } = useMyMeetingQuery(tab, page);

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
