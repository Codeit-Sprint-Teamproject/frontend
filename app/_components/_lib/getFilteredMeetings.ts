'use server';

import { Logout } from '@/app/_utils/logout';
import { fetchAPIServer } from '@/lib/fetchAPI.server';

export interface meetingsProps {
  page?: number;
  size?: number;
  bookTitle?: string;
  startDate?: string;
  endDate?: string;
  gatheringSortType?: string;
  gatheringStatus?: string;
  readingTimeGoals?: string[];
}

export async function getFilteredMeetings(params: meetingsProps = {}) {
  const queryParams = new URLSearchParams();

  if (params.page !== undefined)
    queryParams.append('page', String(params.page));
  if (params.size !== undefined)
    queryParams.append('size', String(params.size));
  if (params.bookTitle) queryParams.append('bookTitle', params.bookTitle);
  if (params.startDate) queryParams.append('startDate', params.startDate);
  if (params.endDate) queryParams.append('endDate', params.endDate);
  if (params.gatheringSortType)
    queryParams.append('gatheringSortType', params.gatheringSortType);
  if (params.gatheringStatus)
    queryParams.append('gatheringStatus', params.gatheringStatus);
  if (params.readingTimeGoals?.length) {
    params.readingTimeGoals.forEach((goal) =>
      queryParams.append('readingTimeGoals', goal),
    );
  }

  const response = await fetchAPIServer(
    `/api/gatheringSearch/filtering?${queryParams.toString()}`,
    'GET',
  );

  if (response?.error) {
    console.error('무한스크롤 모임 검색 API error :', response.error);
    Logout();
    throw new Error(response.error.message);
  }

  return response.result.gatheringResponses;
}
