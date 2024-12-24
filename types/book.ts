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
  userLikeCk?: boolean;
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
export type BookReview = {
  id: number;
  userId: string;
  title: string;
  apprCd: string;
  content: string;
  likes: number;
  createTime: string;
  userName: string;
  bookImage: string;
  userLikeCk?: boolean;
  commentCnt?: number;
};
