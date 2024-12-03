'use client';

import Link from 'next/link';
import { useSelectedLayoutSegment } from 'next/navigation';

export default function Sidebar() {
  const segment = useSelectedLayoutSegment();
  return (
    <ul className='flex flex-col gap-4 w-[346px] h-[790px] border pt-5 pl-5 text-2xl'>
      <li
        className={`w-[289px] h-[57px] hover:bg-[#D9D9D9] p-3 ${segment ? '' : 'bg-[#A0A0A0]'}`}
      >
        <Link href='/mypage' className='font-semibold'>
          마이페이지
        </Link>
      </li>
      <h4
        className={`w-[289px] h-[57px] p-3 font-semibold ${segment === 'meetings' || segment === 'bookmark' ? 'bg-[#A0A0A0]' : ''}`}
      >
        나의 모임
      </h4>
      <li className='ml-10'>
        <Link
          href='/mypage/meetings'
          className={`w-full ${segment === 'meetings' ? 'font-bold' : ''}`}
        >
          참여중인 모임
        </Link>
      </li>
      <li className='ml-10'>
        <Link
          href='/mypage/bookmark'
          className={`${segment === 'bookmark' ? 'font-bold' : ''}`}
        >
          찜한 모임
        </Link>
      </li>
      <li
        className={`w-[289px] h-[57px] hover:bg-[#D9D9D9] p-3 ${segment === 'reviews' ? 'bg-[#A0A0A0]' : ''}`}
      >
        <Link
          href='/mypage/reviews'
          className='w-full font-semibold hover:bg-[#D9D9D9]'
        >
          나의 리뷰
        </Link>
      </li>
      <li className='mt-[360px] font-semibold'>로그아웃</li>
    </ul>
  );
}
