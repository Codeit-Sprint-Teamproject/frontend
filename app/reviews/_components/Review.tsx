import CommentIcon from '../_svg/CommentIcon';
import LikeIcon from '../_svg/LikeIcon';
import { BookReview } from '@/types/book';
import Image from 'next/image';

export default function Review({ review }: { review: BookReview }) {
  return (
    <div className='border w-[520px]'>
      <h3 className='p-2'>{review.title}</h3>
      <div className='flex gap-2.5 p-3 border-y'>
        <Image src={review.bookImage} width={130} height={195} alt='책 표지' />
        <p>{review.content}</p>
      </div>
      <div className='flex justify-between items-center px-5 py-3'>
        <div className='flex items-center gap-2.5'>
          <div className='w-10 h-10 bg-[#D9D9D9] rounded-full'></div>
          <span>{review.userName}</span>
          <p>{review.createTime}</p>
        </div>
        <div className='flex gap-1'>
          <LikeIcon className='w-5 h-5' />
          <span className='ml-1'>{review.likes}</span>
          <CommentIcon className='w-5 h-5' />
          <p className='ml-1'>0</p>
        </div>
      </div>
    </div>
  );
}
