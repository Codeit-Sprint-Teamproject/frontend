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
