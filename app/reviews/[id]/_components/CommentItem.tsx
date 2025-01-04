import { useState } from 'react';
import CommentInput from './CommentInput';
import ConfirmModal from './ConfirmModal';
import { formatTimeWithDate } from '@/app/_utils/dateFormatter';
import DropDown from '@/components/DropDown';
import Avatar from '@/components/common/icons/Avatar';
import { useReveiwCommentQuery } from '@/hooks/useReviewCommentQuery';
import { useModalStore } from '@/store/modal';
import useUserStore from '@/store/userStore';
import { BookReviewComment } from '@/types/review';
import Image from 'next/image';

type Props = {
  comment: BookReviewComment;
};
export default function CommentItem({ comment }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const { user } = useUserStore();
  const { id, userName, content, createTime, profile } = comment;
  const { openModal } = useModalStore();
  const { deleteCommentMutate, updateCommentMutate } = useReveiwCommentQuery();
  const handleDelete = () => {
    openModal(
      <ConfirmModal
        title='댓글을 삭제 하시겠습니까?'
        onDelete={() => deleteCommentMutate(Number(id))}
      />,
    );
  };
  const handleUpdate = (text: string) => {
    const updated = {
      commentId: comment?.id as number,
      reviewId: id,
      content: text,
    };
    const options = {
      onSuccess: () => setIsEditing(false),
    };
    updateCommentMutate(updated, options);
  };
  if (isEditing)
    return (
      <CommentInput
        id={id}
        isEditing={isEditing}
        comment={comment}
        onUpdate={handleUpdate}
        onCancel={() => setIsEditing(false)}
      />
    );
  return (
    <li className='py-4 border-b last:border-none'>
      <div className='flex justify-between'>
        <div className='flex gap-2'>
          {profile ? (
            <Image
              src={profile}
              width={32}
              height={32}
              className='w-8 h-8'
              alt='프로필'
            />
          ) : (
            <Avatar className='w-8 h-8' />
          )}
          <p>{userName}</p>
        </div>
        {user?.name === userName && (
          <DropDown
            items={[
              {
                text: '수정하기',
                onClick: () => setIsEditing(true),
              },
              { text: '삭제하기', onClick: handleDelete, isDelete: true },
            ]}
          />
        )}
      </div>
      <div className='flex flex-col gap-2.5 ml-10'>
        {content}
        <p className='text-sm text-customGrey-300'>
          {formatTimeWithDate(createTime)}
        </p>
      </div>
    </li>
  );
}
