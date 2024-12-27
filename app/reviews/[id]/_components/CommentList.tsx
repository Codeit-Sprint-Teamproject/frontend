'use client';

import CommentInput from './CommentInput';
import CommentItem from './CommentItem';
import { useReviewQuery } from '@/hooks/useReviewQuery';
import { useParams } from 'next/navigation';

export default function CommentList() {
  const { id } = useParams();
  const { review } = useReviewQuery(id as string);

  return (
    <div className='pt-5 border-t'>
      <div className='flex flex-col gap-3'>
        <h3 className='text-lg font-bold'>
          댓글 {review?.commentList?.length}
        </h3>
        <CommentInput id={Number(id)} />
      </div>
      <ul>
        {review?.commentList?.map((comment) => (
          <CommentItem key={comment.id} comment={comment} />
        ))}
      </ul>
    </div>
  );
}
