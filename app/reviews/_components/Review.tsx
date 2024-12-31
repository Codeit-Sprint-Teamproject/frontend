import CommentIcon from '../_svg/CommentIcon';
import LikeIcon from '../_svg/LikeIcon';
import { formatTimeWithDate } from '@/app/_utils/dateFormatter';
import { useReviewLikeQuery } from '@/hooks/useReviewLikeQuery';
import { BookReview } from '@/types/book';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function Review({ review }: { review: BookReview }) {
  const {
    id,
    title,
    bookImage,
    userName,
    createTime,
    apprCd,
    likes,
    commentCnt,
    userLikeCk,
  } = review;
  const { handleLike } = useReviewLikeQuery(id);
  const router = useRouter();

  return (
    <div className='border w-[520px]'>
      <div className='flex items-center justify-between px-5'>
        <h3 className='text-lg font-bold py-3 break-words whitespace-normal max-w-[200px]'>
          {title}
        </h3>
        <span className='text-sm text-customGrey-500'>
          {apprCd === 'SG' ? (
            <p className='text-customGrey-500'>이 책을 추천해요</p>
          ) : apprCd === 'NG' ? (
            <p className='text-customGrey-500'>
              이 책은 아쉬운 부분이 있었어요
            </p>
          ) : null}
        </span>
      </div>
      <div className='w-11/12 border border-customGrey-100 mx-auto'></div>
      <div
        className='flex gap-2.5 px-5 py-3 cursor-pointer'
        onClick={() => router.push(`/reviews/${id}`)}
      >
        <Image
          src={bookImage}
          width={132}
          height={198}
          className='w-[132px] h-[198px]'
          alt='책 표지'
        />
        <p className='w-[326px] h-full text-customGrey-800 line-clamp-[8]'>
          {review.content}
        </p>
      </div>
      <div className='w-11/12 border border-customGrey-100 mx-auto'></div>
      <div className='flex justify-between items-center px-5 py-3'>
        <div className='flex items-center gap-2.5'>
          {/* TODO (유진) profile 데이터 정보 생기면 수정할 예정 */}
          <div className='w-10 h-10 bg-[#D9D9D9] rounded-full'></div>
          <span className='text-sm text-customGrey-800'>{userName}</span>
          <p className='text-customGrey-300 text-sm'>
            {formatTimeWithDate(createTime)}
          </p>
        </div>
        <div className='flex gap-5'>
          <div className='flex gap-1'>
            <button onClick={() => handleLike(userLikeCk as boolean)}>
              <LikeIcon
                className={`w-5 h-5 stroke-customGrey-500 ${userLikeCk ? 'fill-black' : ''}`}
              />
            </button>
            <span className='text-customGrey-500 font-bold'>{likes}</span>
          </div>
          <div className='flex items-center gap-1'>
            <CommentIcon className='w-5 h-5 stroke-customGrey-500' />
            <span className='text-customGrey-500 font-bold'>
              {commentCnt || 0}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
