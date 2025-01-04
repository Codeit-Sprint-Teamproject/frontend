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
      label: '참여중인 모임',
      count: participatingCount || 0,
    },
    { value: 'completed', label: '완료한 모임', count: completedCount },
    { value: 'created', label: '내가 만든 모임', count: myCreatedCount },
    { value: 'bookmark', label: '찜한 모임', count: myWishedCount },
  ] as const;

  return (
    <div className='flex gap-6 border-customGrey-200 border-b h-8'>
      {tabs.map(({ value, label, count }) => (
        <div
          key={value}
          className={`flex items-center gap-2 cursor-pointer ${tab === value ? 'font-bold border-b-2 border-black text-custmGrey-800' : 'text-customGrey-300'}`}
          onClick={() => setTab(value)}
        >
          {label}
          <span
            className={`font-bold ${tab === value ? 'text-custmGrey-800' : 'text-customGrey-300'}`}
          >
            {count}
          </span>
        </div>
      ))}
    </div>
  );
}
