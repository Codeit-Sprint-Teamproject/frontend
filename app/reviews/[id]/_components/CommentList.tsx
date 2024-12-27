import { useQuery } from '@tanstack/react-query';
import { getReviewDetail } from '../_lib/getReviewDetail';
import CommentInput from './CommentInput';
import CommentItem from './CommentItem';
import { useParams } from 'next/navigation';

export default function CommentList() {
  const { id } = useParams();
  const { data: review } = useQuery({
    queryKey: ['reviews', 'detail', id],
    queryFn: () => getReviewDetail(Number(id)),
    staleTime: 60 * 1000,
  });

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
