'use client';

import { Logout } from '@/app/_utils/logout';
import Link from 'next/link';
import { useSelectedLayoutSegment } from 'next/navigation';

export default function Sidebar() {
  const segment = useSelectedLayoutSegment();
  const HandleLogout = Logout();

  if (segment === 'profile') return null;

  return (
    <ul className='flex flex-col gap-2.5 w-[253px] h-[790px] text-xl pl-5'>
      <li className='w-[188px] hover:bg-[#D9D9D9] hover:bg-opacity-30 p-3'>
        <Link
          href='/mypage'
          className={`${segment ? 'text-customGrey-500' : 'text-black font-bold'} leading-normal`}
        >
          마이페이지
        </Link>
      </li>
      <li className='w-[188px] p-3 hover:bg-[#D9D9D9] hover:bg-opacity-30'>
        <Link
          href='/mypage/meetings'
          className={`${segment === 'meetings' ? 'text-black font-bold' : 'text-customGrey-500'} leading-normal`}
        >
          나의 모임
        </Link>
      </li>
      <li className='w-[188px] hover:bg-[#D9D9D9] hover:bg-opacity-30 p-3'>
        <Link
          href='/mypage/reviews'
          className={`w-full ${segment === 'reviews' ? 'text-black font-bold' : 'text-customGrey-500'} leading-normal`}
        >
          나의 게시글
        </Link>
      </li>
      <li
        onClick={HandleLogout}
        className='w-[188px] opacity-50 hover:bg-[#D9D9D9] hover:bg-opacity-30 p-3 leading-normal cursor-pointer mt-7'
      >
        로그아웃
      </li>
    </ul>
  );
}
