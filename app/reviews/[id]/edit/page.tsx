'use client';

import ReviewEditForm from './_components/ReviewEditForm';
import BookProvider from '@/app/reviews/_components/BookContext';

export default function ReviewEditPage({ params }: { params: { id: string } }) {
  const { id } = params;
  return (
    <BookProvider>
      <ReviewEditForm id={id} />
    </BookProvider>
  );
}
