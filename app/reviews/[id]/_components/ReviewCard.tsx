import UnLikeIcon from '../../_svg/UnLikeIcon';
import CommentIcon from '@/app/reviews/_svg/CommentIcon';
import LikeIcon from '@/app/reviews/_svg/LikeIcon';
import { useReviewLikeToggle } from '@/hooks/useReviewLikeToggle';
import useUserStore from '@/store/userStore';
import { BookReviewByTitle } from '@/types/book';
import { useSearchParams } from 'next/navigation';

export default function ReviewCard({
  review,
  bookTitle,
}: {
  review: BookReviewByTitle;
  bookTitle: string;
}) {
  const searchParams = useSearchParams();
  const page = Number(searchParams.get('page')) || 0;
  const { mutate: toggleLike } = useReviewLikeToggle({
    id: review.id,
    isLiked: review.userLikeCk ?? false,
    title: bookTitle,
    page: page,
  });
  const { user } = useUserStore();
  const { title, content, likes, commentCnt, userLikeCk } = review;

  return (
    <li className='flex flex-col gap-2 py-5 border-b'>
      <h3 className='font-bold'>{title}</h3>
      <div className='w-[287px] h-12 line-clamp-2'>{content}</div>
      <div className='flex gap-5 mt-2'>
        <div className='flex items-center gap-1'>
          <button onClick={() => toggleLike()} disabled={!user}>
            {userLikeCk ? (
              <LikeIcon className='w-5 h-5' />
            ) : (
              <UnLikeIcon className='w-5 h-5 stroke-customGrey-500' />
            )}
          </button>
          <p
            className={`text-sm font-bold ${userLikeCk ? 'text-customGreen-500' : 'text-customGrey-500'}`}
          >
            {likes}
          </p>
        </div>
        <div className='flex items-center gap-1'>
          <CommentIcon className='w-5 h-5 stroke-customGrey-500' />
          <p className='text-sm font-bold text-customGrey-500'>
            {commentCnt || 0}
          </p>
        </div>
      </div>
    </li>
  );
}
