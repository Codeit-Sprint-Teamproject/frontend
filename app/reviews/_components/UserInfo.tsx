'use client';

import Avatar from '@/components/common/icons/Avatar';
import SlideNextIcon from '@/components/common/icons/SlideNextIcon';
import useUserStore from '@/store/userStore';
import Image from 'next/image';
import Link from 'next/link';

export default function UserInfo() {
  const { user } = useUserStore();
  if (!user) return null;
  return (
    <div className='flex items-center gap-4 p-5'>
      {user?.profile ? (
        <Image
          src={user?.profile}
          width={48}
          height={48}
          className='rounded-full'
          alt='프로필'
        />
      ) : (
        <Avatar className='w-12 h-12' />
      )}
      <div>
        <p className='text-lg font-bold'>{user?.name}</p>
        <Link href='/mypage/reviews' className='flex items-center'>
          <p className='text-sm text-customGrey-500'>작성한 독서 리뷰</p>
          <SlideNextIcon className='w-5 h-5 stroke-customGrey-500' />
        </Link>
      </div>
    </div>
  );
}
