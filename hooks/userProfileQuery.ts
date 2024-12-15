import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getUser, updateUser } from '@/app/mypage/_lib/profile';

export const useProfileQuery = () => {
  const queryClient = useQueryClient();
  const {
    isLoading,
    data: user,
    error,
  } = useQuery({
    queryKey: ['mypage', 'profile'],
    queryFn: getUser,
  });

  const { mutate: updateProfileMutate } = useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['mypage', 'profile'] });
    },
  });

  return { isLoading, user, error, updateProfileMutate };
};
