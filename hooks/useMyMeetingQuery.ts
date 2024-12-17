import { useQuery } from '@tanstack/react-query';
import {
  getActiveMeetings,
  getBookmarkedMeetings,
  getCompletedMeetings,
  getCreatedMeetings,
} from '@/app/mypage/meetings/_lib/mymeetings';
import { MyMeetingList } from '@/types/meeting';

const SIZE = 3;
export const useMyMeetingQuery = (tab: string, page: number) => {
  const meetingFetchers: Record<
    string,
    (page: number, size: number) => Promise<MyMeetingList[]>
  > = {
    active: getActiveMeetings,
    completed: getCompletedMeetings,
    created: getCreatedMeetings,
    bookmark: getBookmarkedMeetings,
  };

  const { isLoading: isMeetingsLoading, data: meetings } = useQuery<
    MyMeetingList[]
  >({
    queryKey: ['mypage', 'meetings', tab, page],
    queryFn: () => {
      const fetcher = meetingFetchers[tab];
      if (!fetcher) throw new Error('Invalid Tab');
      return fetcher(page, SIZE);
    },
    enabled: !!tab,
  });
  return { isMeetingsLoading, meetings };
};
