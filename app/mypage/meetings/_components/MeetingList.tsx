'use client';

import { useState } from 'react';
import Meeting from './Meeting';
import Pagination from './Pagination';
import { useTabContext } from './TabContext';
import { useMyMeetingCountQuery } from '@/hooks/useMyMeetingCountQuery';
import { useMyMeetingQuery } from '@/hooks/useMyMeetingQuery';
import { MyMeetingCount } from '@/types/meeting';

const SIZE = 3;
const countKeyMap: Record<string, keyof MyMeetingCount> = {
  active: 'participatingCount',
  completed: 'completedCount',
  created: 'myCreatedCount',
  bookmark: 'myWishedCount',
};

export default function MeetingList() {
  const [page, setPage] = useState(0);
  const { tab } = useTabContext();
  const { isCountLoading, count } = useMyMeetingCountQuery(
    tab,
    (cnt) => cnt[countKeyMap[tab]] || 0,
  );
  const { isMeetingsLoading, meetings } = useMyMeetingQuery(tab, page);

  if (isCountLoading || isMeetingsLoading) return <p>Loading...</p>;
  if (!meetings?.length) return <p>모임이 없습니다.</p>;
  const totalPage = Math.ceil((count as number) / SIZE);

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
