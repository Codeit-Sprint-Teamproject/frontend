import Avatar from '@/components/common/icons/Avatar';
import useUserStore from '@/store/userStore';
import Image from 'next/image';

export default function CommentInput() {
  const { user } = useUserStore();
  if (!user) return null;

  return (
    <div className='flex flex-col gap-3 border p-5 rounded-sm'>
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
        className='w-full mb-2.5 placeholder-customGrey-300'
        placeholder='리뷰에 대한 댓글을 남겨보세요'
      />
      <button className='ml-auto px-3 py-2 bg-customGrey-100 text-customGrey-300 rounded-sm'>
        댓글 작성
      </button>
    </div>
  );
}
