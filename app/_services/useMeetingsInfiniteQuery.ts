import { useState } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchMeetings, fetchMeetingsProps } from './fetchMeetings';

type GatheringStatus =
  | 'FULL'
  | 'ACTIVE'
  | 'DELETED'
  | 'COMPLETED'
  | 'RECRUITING';

type ReadingTimeGoal =
  | 'TEN_MINUTES'
  | 'THIRTY_MINUTES'
  | 'ONE_HOUR'
  | 'OVER_ONE_HOUR';

export function useMeetingsInfiniteQuery() {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [gatheringStatus, setGatheringStatus] =
    useState<GatheringStatus>('RECRUITING');
  const [targetTime, setTargetTime] = useState<ReadingTimeGoal[] | null>(null);

  const queryParams: Omit<fetchMeetingsProps, 'page'> = {
    size: 9,
    ...(startDate && { startDate: startDate.toISOString().split('T')[0] }),
    ...(gatheringStatus && { gatheringStatus: 'RECRUITING' }),
    ...(targetTime && { readingTimeGoals: targetTime }),
  };

  const query = useInfiniteQuery({
    queryKey: ['meetings', queryParams],
    queryFn: ({ pageParam = 0 }) =>
      fetchMeetings({ ...queryParams, page: pageParam }),
    getNextPageParam: (lastPage, allPages) =>
      lastPage?.hasNext ? allPages.length : undefined,
    initialPageParam: 0,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

  return {
    ...query,
    filters: {
      startDate,
      setStartDate,
      gatheringStatus,
      setGatheringStatus,
      targetTime,
      setTargetTime,
    },
  };
}
