import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteBookReview } from '@/app/reviews/[id]/_lib/deleteBookReview';
import { useRouter } from 'next/navigation';

export const useReviewQuery = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutate: deleteReviewMutate } = useMutation({
    mutationFn: (id: number) => deleteBookReview(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviews', 'filter'] });
      queryClient.invalidateQueries({ queryKey: ['reviews', 'best'] });
      queryClient.invalidateQueries({ queryKey: ['reviews', 'book'] });
      router.replace('/reviews');
    },
  });

  return { deleteReviewMutate };
};
