'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getMeetingDetails } from '../_lib/meetingDetail';
import MeetingDetailLeft from './MeetingDetailLeft';
import MeetingDetailRight from './MeetingDetailRight';
import MeetingDetailTabs from './MeetingDetailTabs';

interface MeetingDetailsProps {
  gatheringId: number;
}

const MeetingDetails = ({ gatheringId }: MeetingDetailsProps) => {
  const { data, error, isLoading, isError } = useQuery({
    queryKey: ['meetingDetails', gatheringId],
    queryFn: () => getMeetingDetails(gatheringId),
    staleTime: 5 * 60 * 1000,
  });

  if (isLoading) return <div>Loading meeting details...</div>;

  if (isError)
    return (
      <div>
        Error: {error instanceof Error ? error.message : 'Unknown error'}
      </div>
    );

  return (
    <div className='flex flex-col items-center justify-start mt-[131px] w-[1060px] h-[2000px] mb-20 mx-auto '>
      <div className='w-full h-[670px] flex flex-row justify-between'>
        <MeetingDetailLeft data={data.result} />
        <MeetingDetailRight data={data.result} />
      </div>
      <MeetingDetailTabs data={data.result} />
    </div>
  );
};

export default MeetingDetails;
