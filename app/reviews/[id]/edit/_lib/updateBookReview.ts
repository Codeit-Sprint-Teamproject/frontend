import { fetchAPIClient } from '@/lib/fetchAPI.client';

type Review = {
  bookId: number;
  title: string;
  apprCd: string;
  tag: string;
  content: string;
  gatheringId: number;
  tmprStrgYN: string;
};

export const updateBookReview = async ({
  id,
  review,
}: {
  id: number;
  review: Review;
}) => {
  return await fetchAPIClient(`/api/review/BOOK/${id}/edit`, 'PUT', review);
};
