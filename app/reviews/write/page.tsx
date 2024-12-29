import BookProvider from '../_components/BookContext';
import ReviewForm from './_components/ReviewForm';

export default function ReviewWritePage() {
  return (
    <BookProvider>
      <ReviewForm />
    </BookProvider>
  );
}
