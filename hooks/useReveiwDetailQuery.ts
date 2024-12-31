import { useQuery } from '@tanstack/react-query';
import {
  ReviewDetailResponse,
  getReviewDetail,
} from '@/app/reviews/[id]/_lib/getReviewDetail';

export const useReviewDetailQuery = (id: string) => {
  const { data: review } = useQuery<ReviewDetailResponse>({
    queryKey: ['reviews', 'detail', id],
    queryFn: () => getReviewDetail(Number(id)),
    staleTime: 60 * 1000,
    enabled: !!id,
  });
  return { review };
};
