import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  addComment,
  deleteComment,
  updateComment,
} from '@/app/reviews/[id]/_lib/comment';

export const useReveiwCommentQuery = () => {
  const queryClient = useQueryClient();
  const { mutate: addCommentMutate } = useMutation({
    mutationFn: ({ id, text }: { id: number; text: string }) =>
      addComment(id, text),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviews'] });
    },
  });
  const { mutate: deleteCommentMutate } = useMutation({
    mutationFn: (id: number) => deleteComment(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviews'] });
    },
  });
  const { mutate: updateCommentMutate } = useMutation({
    mutationFn: ({
      commentId,
      reviewId,
      content,
    }: {
      commentId: number;
      reviewId: number;
      content: string;
    }) => updateComment(commentId, reviewId, content),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviews'] });
    },
  });

  return { addCommentMutate, deleteCommentMutate, updateCommentMutate };
};
