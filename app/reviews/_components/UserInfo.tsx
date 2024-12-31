'use client';

import Avatar from '@/components/common/icons/Avatar';
import SlideNextIcon from '@/components/common/icons/SlideNextIcon';
import useUserStore from '@/store/userStore';
import Image from 'next/image';

export default function UserInfo() {
  const { user } = useUserStore();
  return (
    <div className='flex items-center gap-4 p-5'>
      {user?.profile ? (
        <Image
          src={user?.profile}
          width={56}
          height={56}
          className='rounded-full'
          alt='프로필'
        />
      ) : (
        <Avatar className='w-14 h-14' />
      )}
      <div>
        <p className='text-lg font-bold'>{user?.name}</p>
        <div className='flex items-center'>
          <p className='text-sm text-customGrey-500'>작성한 독서 리뷰</p>
          <SlideNextIcon className='w-5 h-5 stroke-customGrey-500' />
        </div>
      </div>
    </div>
  );
}
