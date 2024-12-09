'use client';

import { useTabContext } from './TabContext';

export default function Tab() {
  const { tab, setTab } = useTabContext();
  console.log('tab', tab);
  const tabs = [
    { value: 'active', label: '참여 중인 모임', count: 3 },
    { value: 'completed', label: '완료한 모임', count: 3 },
    { value: 'created', label: '내가 만든 모임', count: 3 },
    { value: 'bookmark', label: '찜한 모임', count: 3 },
  ] as const;

  return (
    <div className='flex gap-[34px] text-xl border-b h-12'>
      {tabs.map(({ value, label, count }) => (
        <div
          key={value}
          className={`cursor-pointer ${tab === value ? 'border-b-4 border-black' : ''}`}
          onClick={() => setTab(value)}
        >
          {label}
          <span className='ml-[3px] px-2 bg-black text-white rounded-[30px] text-xl'>
            {count}
          </span>
        </div>
      ))}
    </div>
  );
}
