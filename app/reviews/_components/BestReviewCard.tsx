import BookIcon from '../_svg/BookIcon';
import CommentIcon from '../_svg/CommentIcon';
import LikeIcon from '../_svg/LikeIcon';
import UnLikeIcon from '../_svg/UnLikeIcon';
import { useReviewLikeToggle } from '@/hooks/useReviewLikeToggle';
import { BestBookReview } from '@/types/book';

export default function BestReviewCard({ review }: { review: BestBookReview }) {
  const {
    id,
    title,
    content,
    userName,
    writerReviewCnt,
    likes,
    commentCnt,
    userLikeCk,
  } = review;
  const { mutate: togglelike } = useReviewLikeToggle({
    id,
    isLiked: userLikeCk ?? false,
  });

  return (
    <div className='flex flex-col gap-5 w-[522px]  bg-customGreen-50 px-4 py-5'>
      <div className='flex items-center gap-1 text-sm'>
        <div className='flex items-center bg-white px-1.5 py-0.5 rounded-[2px]'>
          <BookIcon className='w-4 h-4' />
          <span>책</span>
        </div>
        <h3 className='text-customGrey-800'>{title}</h3>
      </div>
      <div className='w-full h-[115px] text-customGrey-800 line-clamp-5'>
        {content}
      </div>
      <div className='flex gap-3 justify-between items-center mt-2.5'>
        <div className='flex gap-3'>
          <div className='w-10 h-10 bg-[#D9D9D9] rounded-full'></div>
          <div className='flex flex-col'>
            <p className='text-sm font-bold'>{userName}</p>
            <p className='text-xs text-customGrey-500'>
              작성한 독서 리뷰 {writerReviewCnt}
            </p>
          </div>
        </div>
        <div className='flex gap-5'>
          <div className='flex items-center gap-1'>
            <button onClick={() => togglelike()}>
              {userLikeCk ? (
                <LikeIcon className='w-5 h-5' />
              ) : (
                <UnLikeIcon className='w-5 h-5 stroke-customGrey-500' />
              )}
            </button>
            <span className='text-customGrey-500'>{likes}</span>
          </div>
          <div className='flex items-center gap-1'>
            <CommentIcon className='w-5 h-5 stroke-customGrey-500' />
            <span className='text-customGrey-500'>{commentCnt || 0}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
