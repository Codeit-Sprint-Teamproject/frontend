import { useEffect } from 'react';
import { useBookContext } from '@/app/reviews/_components/BookContext';
import ReviewForm from '@/app/reviews/write/_components/ReviewForm';
import { useReviewDetailQuery } from '@/hooks/useReveiwDetailQuery';

export default function ReviewEditForm({ id }: { id: string }) {
  const { review } = useReviewDetailQuery(id);
  const { setBook } = useBookContext();
  useEffect(() => {
    if (review?.bookResponse?.id) {
      setBook({
        id: review.bookResponse.id,
        title: review.bookResponse.title,
        gatheringId: review.bookReview.gatheringId || 0,
      });
    }
  }, [review, setBook]);

  if (!review) return null;
  const {
    id: reviewId,
    title,
    content,
    apprCd,
    tagCd,
    gatheringId,
  } = review?.bookReview;
  const { id: bookId } = review?.bookResponse;
  const form = {
    bookId,
    title,
    rating: apprCd,
    tags: tagCd.split(','),
    content,
    gatheringId: gatheringId || 0,
  };

  return <ReviewForm initialReview={form} isEdit={true} reviewId={reviewId} />;
}
