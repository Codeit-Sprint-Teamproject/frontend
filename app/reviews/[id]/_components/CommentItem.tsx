import DropDown from './DropDown';
import Avatar from '@/components/common/icons/Avatar';
import { useReveiwCommentQuery } from '@/hooks/useReviewCommentQuery';
import useUserStore from '@/store/userStore';
import { BookReviewComment } from '@/types/review';
import Image from 'next/image';

type Props = {
  comment: BookReviewComment;
};
export default function CommentItem({ comment }: Props) {
  const { user } = useUserStore();
  const { id, userName, content, createTime, profile } = comment;
  const { deleteCommentMutate } = useReveiwCommentQuery();
  const handleDelete = () => {
    if (
      window.confirm('삭제된 댓글글은 복구할 수 없습니다. 삭제하시겠습니까?')
    ) {
      deleteCommentMutate(id);
    } else {
    }
  };
  return (
    <li className='py-4 border-b last:border-none'>
      <div className='flex justify-between'>
        <div className='flex gap-2'>
          {profile ? (
            <Image src={profile} width={32} height={32} alt='프로필' />
          ) : (
            <Avatar className='w-8 h-8' />
          )}
          <p>{userName}</p>
        </div>
        {user?.name === userName && <DropDown onDelete={handleDelete} />}
      </div>
      <div className='flex flex-col gap-2.5 ml-10'>
        {content}
        <p className='text-customGrey-300'>{createTime}</p>
      </div>
    </li>
  );
}
