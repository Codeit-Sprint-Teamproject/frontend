'use client';

import { useTabContext } from './TabContext';

export default function Tab() {
  const { tab, setTab } = useTabContext();

  return (
    <div className='flex gap-[34px] text-xl border-b h-12'>
      <div
        className={`cursor-pointer ${tab === 'active' ? 'border-b-4 border-black' : ''}`}
        onClick={() => setTab('active')}
      >
        참여 중인 모임
        <span className='ml-[3px] px-2 bg-black text-white rounded-[30px] text-xl'>
          3
        </span>
      </div>
      <div
        className={`cursor-pointer ${tab === 'completed' ? 'border-b-4 border-black' : ''}`}
        onClick={() => setTab('completed')}
      >
        완료한 모임
        <span className='ml-[3px] px-2 bg-black text-white rounded-[30px] text-xl'>
          3
        </span>
      </div>
      <div
        className={`cursor-pointer ${tab === 'created' ? 'border-b-4 border-black' : ''}`}
        onClick={() => setTab('created')}
      >
        내가 만든 모임
        <span className='ml-[3px] px-2 bg-black text-white rounded-[30px] text-xl'>
          3
        </span>
      </div>
      <div
        className={`cursor-pointer ${tab === 'bookmark' ? 'border-b-4 border-black' : ''}`}
        onClick={() => setTab('bookmark')}
      >
        찜한 모임
        <span className='ml-[3px] px-2 bg-black text-white rounded-[30px] text-xl'>
          3
        </span>
      </div>
    </div>
  );
}
