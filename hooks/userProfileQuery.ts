import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getProfile } from '@/app/mypage/_lib/getProfile';
import { updateUser } from '@/app/mypage/_lib/profile';

export const useProfileQuery = () => {
  const queryClient = useQueryClient();
  const {
    isLoading,
    data: user,
    error,
  } = useQuery({
    queryKey: ['mypage', 'profile'],
    queryFn: getProfile,
  });

  const { mutate: updateProfileMutate } = useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['mypage', 'profile'] });
    },
  });

  return { isLoading, user, error, updateProfileMutate };
};
