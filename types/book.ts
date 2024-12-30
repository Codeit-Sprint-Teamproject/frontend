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
  star: number;
  image: string;
  gatheringId: number;
};
export type MyMeetingBookReview = PendingBookReview;
type BookReviewRating = 'SG' | 'NG' | 'NONE';
export type BookReviewTag =
  | 'BAD'
  | 'CS'
  | 'DP'
  | 'FIND'
  | 'FUN'
  | 'KL'
  | 'SAD'
  | 'TIME';
export type BookReview = {
  id: number;
  userId: number;
  title: string;
  apprCd: BookReviewRating;
  content: string;
  likes: number;
  createTime: string;
  userName: string;
  bookImage: string;
  userLikeCk?: boolean;
  commentCnt?: number;
};
export type BookReviewDetail = Omit<BookReview, 'bookImage'> & {
  bookdId: number;
  tagCd: string;
  writerReviewCnt: number;
  userName: string;
};
export type BookDetail = Omit<PendingBookReview, 'gatheringId'> & {
  gatheringExists?: boolean;
};
export type BookReviewByTitle = Omit<
  BookReview,
  'apprCd' | 'userName' | 'bookImage'
>;
export type SearchedBook = Omit<PendingBookReview, 'gatheringId'>;
