'use client';

import { useState } from 'react';
import EmptyMeetingList from './EmptyMeetingList';
import Meeting from './Meeting';
import { useTabContext } from './TabContext';
import Pagination from '@/components/Pagination';
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
  if (!meetings?.length) return <EmptyMeetingList tab={tab} />;
  const totalPage = Math.ceil((count as number) / SIZE);

  return (
    <div className='relative'>
      <div className='flex flex-col gap-3 mt-4'>
        {meetings?.map((meeting) => (
          <Meeting key={meeting.id} meeting={meeting} />
        ))}
      </div>
      <Pagination
        page={page}
        totalPage={totalPage}
        onPageChange={setPage}
        className='flex justify-center gap-2 absolute -bottom-[72px] left-1/3'
      />
    </div>
  );
}
