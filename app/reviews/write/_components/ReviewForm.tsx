'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import BookFeedback from './BookFeedback';
import BookSelector from './BookSelector';
import ReviewInput from './ReviewInput';
import { getMyMeetingBooks } from '@/app/reviews/_lib/getMyMeetingBooks';
import useUserStore from '@/store/userStore';
import { MyMeetingBookReview } from '@/types/book';

type Form = { bookId: number; rating: string; tags: string[]; content: string };
export default function ReviewForm() {
  const { user } = useUserStore();
  const { isLoading, data: books = [] } = useQuery<MyMeetingBookReview[]>({
    queryKey: ['books', 'meetings', 'completed'],
    queryFn: getMyMeetingBooks,
    enabled: !!user?.id,
  });
  const [form, setForm] = useState<Form>({
    bookId: 0,
    rating: '',
    tags: [],
    content: '',
  });

  if (isLoading) return <p>Loading...</p>;
  return (
    <section className='w-[700px] flex flex-col gap-6 mx-auto mt-12'>
      <BookSelector books={books} />
      <BookFeedback
        rating={form.rating}
        tags={form.tags}
        setRating={(rating) => setForm((prev) => ({ ...prev, rating }))}
        setTags={(tags) => setForm((prev) => ({ ...prev, tags }))}
      />
      <ReviewInput
        content={form.content}
        setContent={(content) => setForm((prev) => ({ ...prev, content }))}
      />
      <button className='h-10 ml-auto px-3 py-2 bg-customGreen-500 text-white rounded-sm disabled:bg-customGrey-100 disabled:text-customGrey-300'>
        리뷰 작성
      </button>
    </section>
  );
}
