'use client';

import Link from 'next/link';
import { useSelectedLayoutSegment } from 'next/navigation';

export default function Sidebar() {
  const segment = useSelectedLayoutSegment();

  return (
    <ul className='flex flex-col gap-10 w-[253px] h-[790px] border pl-[41px] pt-[33px] pr-6 text-xl'>
      <li className='w-[188px] hover:bg-[#D9D9D9] hover:bg-opacity-30 p-3'>
        <Link
          href='/mypage'
          className={`${segment ? '' : 'font-bold'} leading-normal`}
        >
          마이페이지
        </Link>
      </li>
      <li className='w-[188px] p-3 hover:bg-[#D9D9D9] hover:bg-opacity-30'>
        <Link
          href='/mypage/meetings'
          className={` ${segment === 'meetings' ? 'font-bold' : ''} leading-normal`}
        >
          나의 모임
        </Link>
      </li>
      <li className='w-[188px] hover:bg-[#D9D9D9] hover:bg-opacity-30 p-3'>
        <Link
          href='/mypage/reviews'
          className={`w-full ${segment === 'reviews' ? 'font-bold' : ''} leading-normal`}
        >
          나의 리뷰
        </Link>
      </li>
      <li className='w-[188px] opacity-50 hover:bg-[#D9D9D9] hover:bg-opacity-30 p-3 leading-normal cursor-pointer'>
        로그아웃
      </li>
    </ul>
  );
}
