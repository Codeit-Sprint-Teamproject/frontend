'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getMeetingDetails } from '../_lib/meetingDetail';
import MeetingDetailLeft from './MeetingDetailLeft';
import MeetingDetailRight from './MeetingDetailRight';
import MeetingDetailTabs from './MeetingDetailTabs';
import PageLocator from './PageLocator';

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
    <div className='flex flex-col mt-20 w-[1060px] h-[2000px] mb-20 mx-auto'>
      <PageLocator pagePath={['홈']} currentPage='모임' />
      <div className='flex flex-row items-start justify-between mt-2'>
        <div className='w-[337px] sticky top-24'>
          <MeetingDetailLeft data={data.result} />
        </div>
        <div className='w-[654px] flex flex-col'>
          <MeetingDetailRight data={data.result} />
          <MeetingDetailTabs gatheringId={gatheringId} />
        </div>
      </div>
    </div>
  );
};

export default MeetingDetails;
