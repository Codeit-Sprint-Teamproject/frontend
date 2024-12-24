import { useQuery } from '@tanstack/react-query';
import {
  ReviewPageResponse,
  getBestAndPendingReviews,
} from '@/app/reviews/_lib/getBestAndPendingReviews';

export const useReviewQuery = () => {
  const { data: reviews } = useQuery<ReviewPageResponse>({
    queryKey: ['reviews', 'best'],
    queryFn: getBestAndPendingReviews,
    staleTime: 60 * 1000,
  });
  return { reviews };
};
