'use client';

import { useQuery } from '@tanstack/react-query';
import { ReviewDetailResponse, getReviewDetail } from '../_lib/getReviewDetail';
import CommentList from './CommentList';
import ReviewTag from './ReviewTag';
import CommentIcon from '@/app/reviews/_svg/CommentIcon';
import LikeIcon from '@/app/reviews/_svg/LikeIcon';
import MoreIcon from '@/components/common/icons/MoreIcon';
import { useReviewLikeQuery } from '@/hooks/useReviewLikeQuery';
import { BookDetail, BookReviewDetail } from '@/types/book';
import Image from 'next/image';
import { useParams } from 'next/navigation';

export default function ReviewDetail() {
  const { id } = useParams();
  const { data: review } = useQuery<ReviewDetailResponse>({
    queryKey: ['reviews', 'detail', id],
    queryFn: () => getReviewDetail(Number(id)),
    staleTime: 60 * 1000,
  });
  const { likeMutation, unlikeMutation } = useReviewLikeQuery(Number(id));
  if (!review) return null;
  const { bookReview, bookResponse, commentList } = review;
  const {
    title: reviewTitle,
    content,
    apprCd,
    tagCd,
    likes,
    createTime,
    userName,
    userLikeCk,
  } = bookReview as BookReviewDetail;
  const {
    title,
    author,
    image,
    publisher,
    publisherDate,
    star,
    gatheringExists,
  } = bookResponse as BookDetail;
  const handleLike = () => {
    if (userLikeCk) {
      unlikeMutation();
    } else {
      likeMutation();
    }
  };
  return (
    <section className='w-[700px] ml-[190px]'>
      <div className='px-[30px] pt-8'>
        <div className='pb-5 border-b'>
          <h2 className='text-[32px] font-bold mb-4'>{reviewTitle}</h2>
          <div className='flex justify-between'>
            <div className='flex items-center gap-2.5'>
              <div className='w-6 h-6 bg-[#D9D9D9] rounded-full'></div>
              <p className='font-bold'>{userName}</p>
              <p className='text-sm text-customGrey-300'>
                {createTime.replace(/-/g, '.')}
              </p>
            </div>
            <button>
              <MoreIcon className='w-6 h-6 stroke-customGrey-300' />
            </button>
          </div>
        </div>
        <div className='flex flex-col gap-8 px-7.5 py-5'>
          <div className='text-lg w-[535px]'>{content}</div>
          <div className='border p-4 rounded-sm'>
            <div className='flex gap-2.5 mb-2.5'>
              <Image
                src={image}
                className='w-[95px] h-[140px]'
                width={95}
                height={140}
                alt='책 표지'
              />
              <div>
                <h3 className='mb-2'>{title}</h3>
                <p className='text-customGrey-500'>
                  저자 <span className='text-customGrey-800'>{author}</span>
                </p>
                <p className='text-customGrey-500'>
                  출판 <span className='text-customGrey-800'>{publisher}</span>
                </p>
                <p className='text-customGrey-500'>
                  발행일{' '}
                  <span className='text-customGrey-800'>{publisherDate}</span>
                </p>
                <p className='text-customGrey-500'>
                  평점 <span className='text-customGrey-800'>{star}</span>
                </p>
              </div>
            </div>
            {gatheringExists && (
              <div className='flex justify-between items-center w-full h-14 bg-customGrey-50 p-2 rounded-[2px]'>
                <p className='text-customGrey-800'>
                  현재 모집 중인 모임이 있어요.
                </p>
                <button className='px-3 py-2 bg-customGreen-50 text-customGreen-600 rounded-sm'>
                  보러 가기
                </button>
              </div>
            )}
          </div>
        </div>
        <div>
          {apprCd === 'SG' ? (
            <p className='text-customGrey-500 mb-1.5'>이 책을 추천해요</p>
          ) : apprCd === 'NG' ? (
            <p className='text-customGrey-500 mb-1.5'>
              이 책은 아쉬운 부분이 있었어요
            </p>
          ) : null}
          <ReviewTag tag={tagCd} />
        </div>
        <div className='flex gap-5 mt-6 mb-5'>
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
            {commentList?.length || 0}
          </div>
        </div>
        <CommentList />
      </div>
    </section>
  );
}
