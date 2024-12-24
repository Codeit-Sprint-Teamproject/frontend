import CommentIcon from '../_svg/CommentIcon';
import LikeIcon from '../_svg/LikeIcon';
import { useReviewLikeQuery } from '@/hooks/useReviewLikeQuery';
import { BookReview } from '@/types/book';
import Image from 'next/image';

export default function Review({ review }: { review: BookReview }) {
  const {
    id,
    title,
    bookImage,
    userName,
    createTime,
    likes,
    commentCnt,
    userLikeCk,
  } = review;
  const { likeMutation, unlikeMutation } = useReviewLikeQuery(id);

  const handleLike = () => {
    if (userLikeCk) {
      unlikeMutation();
    } else {
      likeMutation();
    }
  };
  return (
    <div className='border w-[520px]'>
      <div className='flex items-center  justify-between px-5'>
        <h3 className='text-xl font-bold py-3'>{title}</h3>
        <span className='text-sm text-customGrey-500'>이 책을 추천해요</span>
      </div>
      <div className='w-11/12 border border-customGrey-100 mx-auto'></div>
      <div className='flex gap-4 px-5 py-3'>
        <Image
          src={bookImage}
          width={132}
          height={198}
          className='w-[132px] h-[198px]'
          alt='책 표지'
        />
        <p className='w-full'>{review.content}</p>
      </div>
      <div className='w-11/12 border border-customGrey-100 mx-auto'></div>
      <div className='flex justify-between items-center px-5 py-3'>
        <div className='flex items-center gap-2.5'>
          <div className='w-10 h-10 bg-[#D9D9D9] rounded-full'></div>
          <span>{userName}</span>
          {/* TODO (유진) 몇 시간 전 또는 며칠 전으로 수정할 예정 */}
          <p className='text-customGrey-300'>{createTime}</p>
        </div>
        <div className='flex gap-5'>
          <div className='flex gap-1'>
            <button onClick={handleLike}>
              <LikeIcon
                className={`w-5 h-5 ${userLikeCk ? 'fill-black' : ''}`}
              />
            </button>
            <span>{likes}</span>
          </div>
          <div className='flex items-center gap-1'>
            <CommentIcon className='w-5 h-5' />
            <span>{commentCnt || 0}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
