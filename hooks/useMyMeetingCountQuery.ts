import { DefaultError, useQuery } from '@tanstack/react-query';
import { getMeetingCounts } from '@/app/mypage/meetings/_lib/mymeetings';
import { MyMeetingCount } from '@/types/meeting';

export const useMyMeetingCountQuery = (
  tab?: string,
  select?: (counts: MyMeetingCount) => number,
) => {
  const queryKey = tab
    ? ['mypage', 'meetings', tab, 'counts']
    : ['mypage', 'meetings', 'counts'];
  const { isLoading: isCountLoading, data: count } = useQuery<
    MyMeetingCount,
    DefaultError,
    number
  >({
    queryKey,
    queryFn: getMeetingCounts,
    select: select,
  });

  return { isCountLoading, count };
};
