import { useMemo, useState } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { getFilteredMeetings } from './getFilteredMeetings';

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
  const [filters, setFilters] = useState({
    startDate: null as Date | null,
    gatheringStatus: 'RECRUITING' as GatheringStatus,
    targetTime: null as ReadingTimeGoal[] | null,
  });

  const setFilter = <K extends keyof typeof filters>(
    key: K,
    value: (typeof filters)[K],
  ) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };
  const queryParams = useMemo(() => {
    return {
      size: 6,
      ...(filters.startDate && {
        startDate: filters.startDate?.toISOString().split('T')[0] ?? '',
      }),
      ...(filters.gatheringStatus && {
        gatheringStatus: filters.gatheringStatus ?? 'RECRUITING',
      }),
      ...(filters.targetTime && {
        readingTimeGoals: filters.targetTime ?? [],
      }),
    };
  }, [filters]);

  const query = useInfiniteQuery({
    queryKey: ['meetingsData', queryParams],
    queryFn: ({ pageParam = 0 }) =>
      getFilteredMeetings({ ...queryParams, page: pageParam }),
    getNextPageParam: (lastPage, allPages) =>
      lastPage?.hasNext ? allPages.length : undefined,
    initialPageParam: 0,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

  return {
    ...query,
    filters,
    setFilter,
  };
}
