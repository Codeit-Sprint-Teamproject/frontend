import { fetchAPIClient } from '@/lib/fetchAPI.client';

export type Review = {
  bookId: number;
  title: string;
  apprCd: string;
  tag: string;
  content: string;
  gatheringId: number;
  tmprStrgYN: string;
};

export const createBookReview = async (review: Review) => {
  return await fetchAPIClient('/api/review/create/BOOK', 'POST', review);
};
