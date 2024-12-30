import { z } from 'zod';

export const reviewSchema = z.object({
  bookId: z.number().min(1, '책을 선택해주세요.'),
  title: z.string().min(1, '리뷰 제목을 입력해주세요.'),
  rating: z.string().min(2, '책 추천 여부를 선택해주세요.'),
  tags: z.array(z.string()).min(1, '태그를 하나 이상 선택해주세요.'),
  content: z.string().min(1, '리뷰는 최소 1자 이상 입력해야 합니다.'),
});
