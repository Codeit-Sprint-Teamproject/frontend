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
      <h3 className='p-2'>{title}</h3>
      <div className='flex gap-2.5 p-3 border-y'>
        <Image
          src={bookImage}
          width={130}
          height={195}
          className='w-[130px] h-[195px]'
          alt='책 표지'
        />
        <p>{review.content}</p>
      </div>
      <div className='flex justify-between items-center px-5 py-3'>
        <div className='flex items-center gap-2.5'>
          <div className='w-10 h-10 bg-[#D9D9D9] rounded-full'></div>
          <span>{userName}</span>
          <p>{createTime}</p>
        </div>
        <div className='flex gap-1'>
          <button onClick={handleLike}>
            <LikeIcon className={`w-5 h-5 ${userLikeCk ? 'fill-black' : ''}`} />
          </button>
          <span className='ml-1'>{likes}</span>
          <CommentIcon className='w-5 h-5' />
          <p className='ml-1'>{commentCnt || 0}</p>
        </div>
      </div>
    </div>
  );
}
