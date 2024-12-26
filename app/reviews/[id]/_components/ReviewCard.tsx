import CommentIcon from '@/app/reviews/_svg/CommentIcon';
import LikeIcon from '@/app/reviews/_svg/LikeIcon';
import { useReviewLikeQuery } from '@/hooks/useReviewLikeQuery';
import { BookReviewByTitle } from '@/types/book';

export default function ReviewCard({ review }: { review: BookReviewByTitle }) {
  const { likeMutation, unlikeMutation } = useReviewLikeQuery(review.id);
  const { title, content, likes, commentCnt, userLikeCk } = review;

  const handleLike = () => {
    if (userLikeCk) {
      unlikeMutation();
    } else {
      likeMutation();
    }
  };

  return (
    <li className='flex flex-col gap-2 py-5 border-b'>
      <h3 className='font-bold'>{title}</h3>
      <div className='w-[287px] h-12 line-clamp-2'>{content}</div>
      <div className='flex gap-5 mt-2'>
        <div className='flex gap-1'>
          <button onClick={handleLike}>
            <LikeIcon className={`w-5 h-5 ${userLikeCk ? 'fill-black' : ''}`} />
          </button>
          <p>{likes}</p>
        </div>
        <div className='flex items-center gap-1'>
          <CommentIcon className='w-5 h-5' />
          <p>{commentCnt || 0}</p>
        </div>
      </div>
    </li>
  );
}
