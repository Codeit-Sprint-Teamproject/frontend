'use client';

import useUserStore from '@/store/userStore';
import Image from 'next/image';
import Link from 'next/link';

export default function NoPendingReviewBox() {
  const { user } = useUserStore();
  if (!user)
    return (
      <div className='w-[360px] flex flex-col items-center gap-4 p-5 border rounded-md'>
        <Image src='/book.png' width={90} height={72} alt='책' />
        <div className='text-customGrey-800 text-center mt-1'>
          <p>로그인하고</p>
          <p>책 속에서 얻은 배움을 정리해보세요</p>
        </div>
        <Link
          href='/auth/login'
          className='w-full h-12 min-h-10 p-3 bg-customGreen-500 text-white rounded-sm text-center font-bold'
        >
          모읽지 시작하기
        </Link>
      </div>
    );
  return (
    <div className='w-[360px] flex flex-col border rounded-md p-5'>
      <div className='flex flex-col gap-4 text-center'>
        <div>
          <h3 className='font-bold text-customGrey-800 mt-10'>
            리뷰하고 싶은 책이 있나요?
          </h3>
          <div className='text-sm text-customGrey-800 mt-3'>
            <p>독서 리뷰를 작성하고</p>
            <p> 책 속에서 얻은 배움을 정리해보세요</p>
          </div>
        </div>
        <Link
          href='/reviews/write'
          className='h-12 min-h-8 p-3 border border-customGreen-100 text-customGreen-600 font-bold mt-4 rouned-sm'
        >
          리뷰 작성하기
        </Link>
      </div>
    </div>
  );
}
