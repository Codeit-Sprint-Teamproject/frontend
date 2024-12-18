import BookIcon from '../_svg/BookIcon';
import CommentIcon from '../_svg/CommentIcon';
import LikeIcon from '../_svg/LikeIcon';
import { BestBookReview } from '@/types/book';

export default function BestReviewCard({ review }: { review: BestBookReview }) {
  const { title, content, userName, writerReviewCnt, likes, commentCnt } =
    review;
  return (
    <div className='flex flex-col gap-4 w-[512px] h-[189px] bg-[#F4F4F4] px-[15px] py-2.5'>
      <h3 className='flex items-center gap-1 font-bold'>
        <BookIcon className='w-4 h-4' />
        {title}
      </h3>
      <div className='w-full h-16'>{content}</div>
      <div className='flex gap-3 justify-between items-center'>
        <div className='flex gap-3'>
          <div className='w-10 h-10 bg-[#D9D9D9] rounded-full'></div>
          <div className='flex flex-col'>
            <p className='font-bold'>{userName}</p>
            <p>작성한 독서 리뷰{writerReviewCnt}</p>
          </div>
        </div>
        <div className='flex gap-5'>
          <div className='flex gap-2'>
            <LikeIcon className='w-5 h-5' />
            <span>{likes}</span>
          </div>
          <div className='flex gap-2'>
            <CommentIcon className='w-5 h-5' />
            <span>{commentCnt || 0}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
