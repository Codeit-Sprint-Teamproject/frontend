'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';
import BookFeedback from './BookFeedback';
import BookSelector from './BookSelector';
import { useBookContext } from '@/app/reviews/_components/BookContext';
import { getMyMeetingBooks } from '@/app/reviews/_lib/getMyMeetingBooks';
import { reviewSchema } from '@/app/reviews/_lib/reviewSchema';
import { useReviewQuery } from '@/hooks/useReviewQuery';
import useUserStore from '@/store/userStore';
import { MyMeetingBookReview } from '@/types/book';
import { zodResolver } from '@hookform/resolvers/zod';
import { Textarea } from '@nextui-org/input';
import { useRouter } from 'next/navigation';

export type Form = {
  bookId: number;
  title: string;
  rating: string;
  tags: string[];
  content: string;
  gatheringId: number;
};
type Props = {
  isEdit?: boolean;
  initialReview: Form;
  reviewId?: number;
};
export default function ReviewForm({
  isEdit = false,
  initialReview = {
    bookId: 0,
    title: '',
    rating: '',
    tags: [],
    content: '',
    gatheringId: 0,
  },
  reviewId,
}: Props) {
  const router = useRouter();
  const { user } = useUserStore();
  const { book } = useBookContext();
  const { addReviewMutate, updateReviewMutate } = useReviewQuery();
  const { isLoading, data: books = [] } = useQuery<MyMeetingBookReview[]>({
    queryKey: ['books', 'meetings', 'completed'],
    queryFn: getMyMeetingBooks,
    enabled: !!user?.id,
  });
  const {
    register,
    setValue,
    getValues,
    formState: { isValid },
    handleSubmit,
  } = useForm<Form>({
    resolver: zodResolver(reviewSchema),
    defaultValues: initialReview,
    mode: 'onChange',
  });
  const onSubmit = (form: Form) => {
    const { bookId, title, rating, tags, content, gatheringId } = form;
    const review = {
      bookId,
      title,
      apprCd: rating,
      tag: tags.join(','),
      content: content,
      gatheringId,
      tmprStrgYN: 'N',
    };
    if (!isEdit) {
      addReviewMutate(review);
    } else if (reviewId) {
      updateReviewMutate({ id: reviewId, review });
    }
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
    }
  };

  useEffect(() => {
    if (book?.id) {
      setValue('bookId', book.id, { shouldValidate: true });
      setValue('gatheringId', book.gatheringId || 0, { shouldValidate: true });
    } else {
      setValue('bookId', 0, { shouldValidate: true });
    }
  }, [book, setValue]);

  if (isLoading) return <p>Loading...</p>;
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='w-[700px] flex flex-col gap-6 mx-auto mt-12'
    >
      <input
        {...register('title')}
        className='text-[32px] font-bold text-customGrey-800 pb-5 border-b placeholder:text-customGrey-300'
        placeholder='리뷰 제목을 입력해 주세요'
        onKeyDown={handleKeyDown}
      />
      <BookSelector books={books} />
      <BookFeedback setValue={setValue} getValues={getValues} />
      <Textarea
        {...register('content')}
        className='border outline-none placeholder:text-sm'
        classNames={{
          base: 'min-h-[356px] resize-y',
          inputWrapper: 'min-h-[356px] p-5',
          input: 'min-h-[208px]  resize-none',
          label: 'text-lg font-bold mb-4',
        }}
        label='리뷰를 작성해 주세요'
        placeholder={` 🞄 책을 읽고 나서 어떤 기분이 들었나요?
 🞄 이 책에서 가장 기억에 남는 장면이나 문장이 있었나요?
 🞄 다른 사람들에게 이 책을 추천하고 싶다면, 어떤 이유인가요?
 🞄 책 속에서 가장 공감한 내용은 무엇인가요?
 🞄 아쉬웠던 점이 있다면 간단히 적어주세요.`}
        minRows={13}
      />
      <div className='flex justify-end gap-4'>
        <button
          className='h-10 px-3 py-2 border rounded-sm text-lg'
          onClick={() => router.back()}
        >
          취소
        </button>
        <button
          className='h-10 px-3 py-2 bg-customGreen-500 text-white rounded-sm disabled:bg-customGrey-100 disabled:text-customGrey-300'
          disabled={!isValid}
        >
          {isEdit ? '리뷰 수정' : '리뷰 작성'}
        </button>
      </div>
    </form>
  );
}
