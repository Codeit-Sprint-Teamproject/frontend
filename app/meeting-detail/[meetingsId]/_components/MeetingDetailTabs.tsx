'use client';

import { useState } from 'react';
import MeetingInfo from './MeetingInfo';
import MeetingReviews from './MeetingReviews';

export default function MeetingDetailTabs() {
  const [activeTab, setActiveTab] = useState<string>('meeting-info');

  const tabs = [
    { id: 'meeting-info', title: '모임 소개' },
    { id: 'meeting-reviews', title: '모임 리뷰' },
  ];

  return (
    <div className='w-full mt-[72px]'>
      {/* 탭 제목 */}
      <ul className='flex flex-row gap-4 border-b-[1px]'>
        {tabs.map((tab) => (
          <li
            key={tab.id}
            className={`text-[22px] font-medium ${activeTab === tab.id ? 'pb-2 border-b-[3px] border-black' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.title}
          </li>
        ))}
      </ul>
      {/* 탭 내용 */}
      <div className='mt-6'>
        {/* 탭 내용 작성 */}
        {activeTab === 'meeting-info' ? (
          <MeetingInfo />
        ) : (
          <>
            <MeetingReviews />
          </>
        )}
      </div>
    </div>
  );
}
