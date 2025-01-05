import CommentIcon from '../_svg/CommentIcon';
import LikeIcon from '../_svg/LikeIcon';
import UnLikeIcon from '../_svg/UnLikeIcon';
import { formatTimeWithDate } from '@/app/_utils/dateFormatter';
import Avatar from '@/components/common/icons/Avatar';
import { useReviewLikeToggle } from '@/hooks/useReviewLikeToggle';
import useUserStore from '@/store/userStore';
import { BookReview } from '@/types/book';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';

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
    profile,
  } = review;
  const searchParams = useSearchParams();
  const filter = searchParams.get('filter') || 'ALL';
  const { mutate: toggleLike } = useReviewLikeToggle({
    id,
    isLiked: userLikeCk ?? false,
    filter,
  });
  const router = useRouter();
  const { user } = useUserStore();

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
          {profile ? (
            <Image
              src={profile}
              width={32}
              height={32}
              className='w-8 h-8 rounded-full'
              alt='프로필'
            />
          ) : (
            <Avatar className='w-8 h-8' />
          )}
          <span className='text-sm text-customGrey-800'>{userName}</span>
          <p className='text-customGrey-300 text-sm'>
            {formatTimeWithDate(createTime)}
          </p>
        </div>
        <div className='flex gap-5'>
          <div className='flex items-center gap-1'>
            <button onClick={() => toggleLike()} disabled={!user}>
              {userLikeCk ? (
                <LikeIcon className='w-5 h-5' />
              ) : (
                <UnLikeIcon className='w-5 h-5 stroke-customGrey-500' />
              )}
            </button>
            <span
              className={`text-sm font-bold ${userLikeCk ? 'text-customGreen-500' : 'text-customGrey-500'}`}
            >
              {likes}
            </span>
          </div>
          <div className='flex items-center gap-1'>
            <CommentIcon className='w-5 h-5 stroke-customGrey-500' />
            <span className='text-sm text-customGrey-500 font-bold'>
              {commentCnt || 0}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
