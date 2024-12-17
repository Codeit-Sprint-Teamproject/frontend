'use client';

import { useQuery } from '@tanstack/react-query';
import { getMeetingCounts } from '../_lib/mymeetings';
import { useTabContext } from './TabContext';

export default function Tab() {
  const { tab, setTab } = useTabContext();
  const { isLoading, data: meetingCounts } = useQuery({
    queryKey: ['mypage', 'meetings', 'counts'],
    queryFn: getMeetingCounts,
  });
  if (isLoading) return null;
  const { participatingCount, completedCount, myCreatedCount, myWishedCount } =
    meetingCounts!;

  const tabs = [
    {
      value: 'active',
      label: '참여 중인 모임',
      count: participatingCount || 0,
    },
    { value: 'completed', label: '완료한 모임', count: completedCount },
    { value: 'created', label: '내가 만든 모임', count: myCreatedCount },
    { value: 'bookmark', label: '찜한 모임', count: myWishedCount },
  ] as const;

  return (
    <div className='flex gap-6 text-lg border-b h-14'>
      {tabs.map(({ value, label, count }) => (
        <div
          key={value}
          className={`flex items-center gap-2 cursor-pointer ${tab === value ? 'font-bold border-b-4 border-black' : ''}`}
          onClick={() => setTab(value)}
        >
          {label}
          <span className='w-[42px]  py-[2px] bg-black text-white text-center rounded-[10px]'>
            {count}
          </span>
        </div>
      ))}
    </div>
  );
}
