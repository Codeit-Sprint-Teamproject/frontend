'use client';

import { useState } from 'react';
import MeetingInfo from './MeetingInfo';

interface MeetingInfo {
  gatheringId: number;
}

export default function MeetingDetailTabs({ gatheringId }: MeetingInfo) {
  const [activeTab, setActiveTab] = useState<string>('meeting-info');

  const tabs = [{ id: 'meeting-info', title: '모임 소개' }];

  return (
    <div className='w-full mt-[72px]'>
      <ul className='flex flex-row gap-4 border-b-[1px]'>
        {tabs.map((tab) => (
          <li
            key={tab.id}
            className={`text-[22px] font-medium cursor-pointer ${activeTab === tab.id ? 'pb-2 border-b-[3px] border-black' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.title}
          </li>
        ))}
      </ul>
      <div className='mt-6'>
        {activeTab === 'meeting-info' ? (
          <MeetingInfo gatheringId={gatheringId} />
          <MeetingInfo gatheringId={gatheringId} />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
