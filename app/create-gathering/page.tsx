'use client';

import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import GatheringForm, { GatheringFormData } from './_components/GatheringForm';
import { fetchAPIClient } from '@/lib/fetchAPI.client';
import { useRouter } from 'next/navigation';

interface GatheringCreateResponse {
  success: boolean;
  data: {
    id: number;
    name: string;
  };
}

export default function GatheringCreatePage() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const mutation = useMutation<
    GatheringCreateResponse,
    Error,
    GatheringFormData
  >({
    mutationFn: async (formData: GatheringFormData) => {
      const data = new FormData();

      const gatheringCreate = {
        name: formData.name,
        content: formData.content,
        startDate: formData.startDate,
        endDate: formData.endDate,
        minCapacity: formData.minCapacity,
        maxCapacity: formData.maxCapacity,
        bookId: formData.bookId,
        gatheringStatus: 'RECRUITING',
        readingTimeGoal: formData.readingTimeGoal,
        gatheringWeek: formData.gatheringWeek,
      };

      data.append('gatheringCreate', JSON.stringify(gatheringCreate));

      if (formData.file) {
        data.append('file', formData.file);
      }

      const response = await fetchAPIClient('/api/gathering', 'POST', data);

      if (response?.error) {
        throw new Error(response.error.message);
      }

      return response as GatheringCreateResponse;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['joinableMeetings'] });
      queryClient.invalidateQueries({ queryKey: ['participatingMeetings'] });
      queryClient.invalidateQueries({ queryKey: ['meetingsData'] });
      router.push('/');
    },
    onError: (error) => {
      setErrorMessage(error.message);
    },
  });

  const handleSubmit = (formData: GatheringFormData) => {
    if (!formData.name) {
      setErrorMessage('모임 이름을 입력해주세요.');
      return;
    }
    if (!formData.content) {
      setErrorMessage('모임 내용을 입력해주세요.');
      return;
    }
    if (!formData.startDate || !formData.endDate) {
      setErrorMessage('모임 시작일과 종료일을 선택해주세요.');
      return;
    }
    if (formData.minCapacity < 1) {
      setErrorMessage('모집 최소 인원은 1명 이상이어야 합니다.');
      return;
    }
    if (formData.maxCapacity < formData.minCapacity) {
      setErrorMessage('모집 최대 인원은 최소 인원 이상이어야 합니다.');
      return;
    }

    setErrorMessage(null);
    mutation.mutate(formData);
  };

  return (
    <div className='flex flex-col items-center py-12 min-h-screen'>
      <GatheringForm onSubmit={handleSubmit} />
      {errorMessage && (
        <p className='text-customRed mb-4 text-base font-semibold'>
          {errorMessage}
        </p>
      )}
      {mutation.status === 'pending' && (
        <div className='flex items-center h-full justify-center'>
          <div className='h-8 w-8 animate-spin rounded-full border-4 border-customGreen-500 border-t-transparent' />
        </div>
      )}
      {mutation.status === 'error' && (
        <p>Error: {(mutation.error as Error)?.message}</p>
      )}
      {mutation.status === 'success' && (
        <p className='text-customGreen-500'>모임이 추가되었습니다!</p>
      )}
    </div>
  );
}
