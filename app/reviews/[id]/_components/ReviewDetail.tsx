'use client';

import { Rating } from 'react-simple-star-rating';
import CommentList from './CommentList';
import ConfirmModal from './ConfirmModal';
import DropDown from './DropDown';
import GatheringAction from './GatheringAction';
import ReviewTag from './ReviewTag';
import { formatDate } from '@/app/_utils/dateFormatter';
import CommentIcon from '@/app/reviews/_svg/CommentIcon';
import LikeIcon from '@/app/reviews/_svg/LikeIcon';
import UnLikeIcon from '@/app/reviews/_svg/UnLikeIcon';
import Modal from '@/components/Modal';
import Avatar from '@/components/common/icons/Avatar';
import { useReviewDetailQuery } from '@/hooks/useReveiwDetailQuery';
import { useReviewLikeToggle } from '@/hooks/useReviewLikeToggle';
import { useReviewQuery } from '@/hooks/useReviewQuery';
import { useModalStore } from '@/store/modal';
import useUserStore from '@/store/userStore';
import { BookDetail, BookReviewDetail } from '@/types/book';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';

export default function ReviewDetail() {
  const router = useRouter();
  const { id } = useParams();
  const { review } = useReviewDetailQuery(id as string);
  const { deleteReviewMutate } = useReviewQuery();
  const { user } = useUserStore();
  const { mutate: toggleLike } = useReviewLikeToggle({
    id: Number(id),
    isLiked: review?.bookReview?.userLikeCk ?? false,
    title: review?.bookResponse?.title,
    page: 0,
  });
  const { isOpen, openModal } = useModalStore();

  const handleDelete = () => {
    openModal(
      <ConfirmModal
        title='게시글을 삭제 하시겠습니까?'
        onDelete={() => deleteReviewMutate(Number(id))}
      />,
    );
  };
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
    profile,
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

  return (
    <section className='w-[700px] ml-[190px]'>
      <div className='px-[30px] pt-8'>
        <div className='pb-5 border-b'>
          <h2 className='text-[32px] font-bold mb-4'>{reviewTitle}</h2>
          <div className='flex justify-between'>
            <div className='flex items-center gap-2.5'>
              {profile ? (
                <Image
                  src={profile}
                  width={24}
                  height={24}
                  className='w-6 h-6 rounded-full'
                  alt='프로필'
                />
              ) : (
                <Avatar className='w-6 h-6' />
              )}
              <p className='font-bold'>{userName}</p>
              <p className='text-sm text-customGrey-300'>
                {formatDate(createTime)}
              </p>
            </div>
            {user?.name === userName && (
              <DropDown
                onDelete={handleDelete}
                onUpdate={() => router.push(`/reviews/${id}/edit`)}
              />
            )}
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
                <p className='text-sm text-customGrey-500'>
                  저자 <span className='text-customGrey-800'>{author}</span>
                </p>
                <p className='text-sm text-customGrey-500'>
                  출판 <span className='text-customGrey-800'>{publisher}</span>
                </p>
                <p className='text-sm text-customGrey-500'>
                  발행일{' '}
                  <span className='text-customGrey-800'>{publisherDate}</span>
                </p>
                <div className='flex items-center gap-2 text-sm text-customGrey-500'>
                  평점
                  <div className='flex items-center mb-1'>
                    <Rating
                      size={14}
                      readonly
                      initialValue={star / 2}
                      fillColor='#262626'
                      SVGstyle={{ display: 'inline' }}
                    />
                    <span className='text-customGrey-800 ml-[1px] pt-[2px]'>
                      {star}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <GatheringAction status={gatheringExists as boolean} />
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
          <div className='flex items-center gap-1'>
            <button onClick={() => toggleLike()}>
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
            <span className='text-sm font-bold text-customGrey-500'>
              {commentList?.length || 0}
            </span>
          </div>
        </div>
        <CommentList />
      </div>
      {isOpen && <Modal width='w-[300px] h-[120px]' />}
    </section>
  );
}
