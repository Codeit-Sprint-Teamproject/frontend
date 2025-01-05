export type BookReviewFilter =
  | 'ALL'
  | 'CS'
  | 'FUN'
  | 'SAD'
  | 'KL'
  | 'TIME'
  | 'FIND';
export type BookReviewComment = {
  id: number;
  userId: number;
  content: string;
  orders: number;
  userName: string;
  profile: string;
  createTime: string;
};
export type MyBookReview = {
  id: number;
  title: string;
  bookTitle: string;
  content: string;
  createTime: string;
  userLikeCk?: boolean;
  likes: number;
  commentCnt?: number;
};
