'use client';

import { useEffect, useState } from 'react';
import MeetingDetailLeft from './_components/MeetingDetailLeft';
import MeetingDetailRight from './_components/MeetingDetailRight';
import MeetingDetailTabs from './_components/MeetingDetailTabs';
import { fetchMeetingDetails } from './_lib/meetingDetail';
import { IMeeting } from '@/app/types';
import { useParams } from 'next/navigation';

export default function MeetingDetailPage() {
  const [meetingData, setMeetingData] = useState<IMeeting[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const params = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchMeetingDetails(Number(params.meetingsId));
        setMeetingData(data);
        console.log(data);
        setLoading(false);
      } catch (err) {
        console.error('데이터를 가져오는 중 오류 발생:', err);
        setError(true);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: 데이터를 불러오지 못했습니다.</div>;
  }

  if (!meetingData) {
    return <div>데이터가 없습니다.</div>;
  }

  return (
    <div className='flex flex-col items-center justify-start mt-[131px] w-[1060px] h-[2000px] mb-20 mx-auto '>
      <div className='w-full h-[670px] flex flex-row justify-between'>
        <MeetingDetailLeft />
        <MeetingDetailRight />
      </div>
      <MeetingDetailTabs />
    </div>
  );
}
