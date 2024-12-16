'use client';

import { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getActiveMeetings, getCompletedMeetings } from '../_lib/mymeetings';
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
  const queryClient = useQueryClient();

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

  const { isLoading, data: meetings } = useQuery<MyMeetingList[]>({
    queryKey: ['mypage', 'meetings', tab, page],
    queryFn: () => getMeetings(page, SIZE),
    enabled: !!tab,
  });
  const total =
    queryClient.getQueryData<MyMeetingCount>([
      'mypage',
      'meetings',
      'counts',
    ])?.[countKeyMap[tab]] || 0;

  if (isLoading) return <p>Loading...</p>;
  if (!meetings?.length) return <p>모임이 없습니다.</p>;
  const totalPage = Math.ceil(total / SIZE);

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
