import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { deleteBookReview } from '@/app/reviews/[id]/_lib/deleteBookReview';
import {
  ReviewDetailResponse,
  getReviewDetail,
} from '@/app/reviews/[id]/_lib/getReviewDetail';
import { Review, createBookReview } from '@/app/reviews/_lib/createBookReview';
import { useRouter } from 'next/navigation';

export const useReviewQuery = (id?: string) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { data: review } = useQuery<ReviewDetailResponse>({
    queryKey: ['reviews', 'detail', id],
    queryFn: () => getReviewDetail(Number(id)),
    staleTime: 60 * 1000,
    enabled: !!id,
  });
  const { mutate: addReviewMutate } = useMutation({
    mutationFn: (review: Review) => createBookReview(review),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviews'] });
      router.replace('/reviews');
    },
  });
  const { mutate: deleteReviewMutate } = useMutation({
    mutationFn: (id: number) => deleteBookReview(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviews', 'filter'] });
      queryClient.invalidateQueries({ queryKey: ['reviews', 'best'] });
      queryClient.invalidateQueries({ queryKey: ['reviews', 'book'] });
      router.replace('/reviews');
    },
  });

  return { review, addReviewMutate, deleteReviewMutate };
};
