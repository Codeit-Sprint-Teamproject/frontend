import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addComment } from '@/app/reviews/[id]/_lib/comment';

export const useReveiwCommentQuery = () => {
  const queryClient = useQueryClient();
  const { mutate: addCommentMutate } = useMutation({
    mutationFn: ({ id, text }: { id: number; text: string }) =>
      addComment(id, text),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviews'] });
    },
  });

  return { addCommentMutate };
};
