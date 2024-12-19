export type MyReadingList = {
  bookProfile: string;
  readingDate: string;
};

export type BestBookReview = {
  id: number;
  title: string;
  content: string;
  likes: number;
  commentCnt: number;
  writerReviewCnt: number;
  userName: string;
};
export type PendingBookReview = {
  id: number;
  title: string;
  author: string;
  publisher: string;
  publisherDate: string;
  start: number;
  image: string;
  gatheringId: number;
};
