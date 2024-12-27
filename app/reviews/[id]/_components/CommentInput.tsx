import { useState } from 'react';
import Avatar from '@/components/common/icons/Avatar';
import { useReveiwCommentQuery } from '@/hooks/useReviewCommentQuery';
import useUserStore from '@/store/userStore';
import Image from 'next/image';

export default function CommentInput({ id }: { id: number }) {
  const { user } = useUserStore();
  const [text, setText] = useState('');
  const { addCommentMutate } = useReveiwCommentQuery();
  const isValid = () => {
    return !text.trim() || !text;
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };
  const handleAdd = () => {
    addCommentMutate(
      { id, text },
      {
        onSuccess: () => {
          setText('');
        },
      },
    );
  };
  if (!user)
    return (
      <div className='flex flex-col border p-5 rounded-sm'>
        <input
          type='text'
          className='w-full mb-2.5 placeholder-customGrey-300'
          placeholder='로그인 후 댓글을 남겨보세요'
        />
        <button className='ml-auto px-3 py-2 bg-customGrey-100 text-customGrey-300 rounded-sm'>
          댓글 작성
        </button>
      </div>
    );

  return (
    <div className='flex flex-col gap-2.5 border p-5 rounded-sm'>
      <div className='flex gap-2'>
        {user?.profile ? (
          <Image
            src={user.profile}
            className='rounded-full'
            width={32}
            height={32}
            alt='프로필'
          />
        ) : (
          <Avatar className='w-8 h-8' />
        )}
        <p className='text-customGrey-800'>{user.name}</p>
      </div>
      <input
        type='text'
        value={text}
        className='w-full mb-2.5 placeholder-customGrey-300'
        onChange={handleChange}
        placeholder='리뷰에 대한 댓글을 남겨보세요'
      />
      <button
        className='ml-auto px-3 py-2 rounded-sm bg-customGreen-500 text-white disabled:bg-customGrey-100 disabled:text-customGrey-300'
        disabled={isValid()}
        onClick={handleAdd}
      >
        댓글 작성
      </button>
    </div>
  );
}
