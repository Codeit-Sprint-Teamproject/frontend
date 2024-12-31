import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteBookReview } from '@/app/reviews/[id]/_lib/deleteBookReview';
import { updateBookReview } from '@/app/reviews/[id]/edit/_lib/updateBookReview';
import { Review, createBookReview } from '@/app/reviews/_lib/createBookReview';
import { useRouter } from 'next/navigation';

export const useReviewQuery = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

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
  const { mutate: updateReviewMutate } = useMutation({
    mutationFn: ({ id, review }: { id: number; review: Review }) =>
      updateBookReview({ id, review }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviews'] });
      router.replace(`/reviews`);
    },
  });

  return { addReviewMutate, deleteReviewMutate, updateReviewMutate };
};
