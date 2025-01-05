import CommentIcon from '@/app/reviews/_svg/CommentIcon';
import LikeIcon from '@/app/reviews/_svg/LikeIcon';
import UnLikeIcon from '@/app/reviews/_svg/UnLikeIcon';
import DropDown from '@/components/DropDown';
import BookICon from '@/components/common/icons/Book';
import { MyBookReview } from '@/types/review';
import { useRouter } from 'next/navigation';

export default function Review({ review }: { review: MyBookReview }) {
  const router = useRouter();
  const { id, title, bookTitle, createTime, userLikeCk, likes, commentCnt } =
    review;
  const handleDelete = () => {};
  const handleUpdate = () => {
    router.push(`/reviews/${id}/edit`);
  };
  return (
    <li className='flex flex-col gap-3 py-4 border-b'>
      <div className='h-7 flex justify-between'>
        <div className='flex items-center gap-1 text-sm mb-[2px]'>
          <div className='flex items-center gap-1 bg-customGreen-50 px-1.5 py-1 rounded-[2px]'>
            <BookICon className='w-4 h-4 stroke-customGreen-500' />
            <span className='text-xs text-customGreen-500'>책</span>
          </div>
          <p className='text-customGrey-500'>{bookTitle}</p>
        </div>
        <DropDown
          items={[
            { text: '수정하기', onClick: handleUpdate },
            { text: '삭제하기', onClick: handleDelete, isDelete: true },
          ]}
        />
      </div>
      <h3 className='text-lg text-customGrey-800'>{title}</h3>
      <div className='flex justify-between'>
        <p className='text-customGrey-300 text-sm'>
          {createTime.replace(/-/g, '.')}
        </p>
        <div className='flex gap-5'>
          <div className='flex items-center gap-1'>
            {userLikeCk ? (
              <LikeIcon className='w-5 h-5' />
            ) : (
              <UnLikeIcon className='w-5 h-5' />
            )}
            <p
              className={`text-sm font-bold ${userLikeCk ? 'text-customGreen-500' : 'text-customGrey-500'}`}
            >
              {likes}
            </p>
          </div>
          <div className='flex items-center gap-1'>
            <CommentIcon className='w-5 h-5' />
            <p className='text-sm font-bold text-customGrey-500'>
              {commentCnt || 0}
            </p>
          </div>
        </div>
      </div>
    </li>
  );
}
