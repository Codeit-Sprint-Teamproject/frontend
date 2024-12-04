import Link from 'next/link';

export default function NavigationCard() {
  return (
    <div className='flex gap-7'>
      <Link
        href='/mypage/meetings'
        className='w-[218px] h-[123px] bg-[#F4F4F4] flex flex-col items-center justify-center gap-8'
      >
        <p className='text-2xl font-bold'>2</p>
        <p className='text-sm'>참여중인 모임</p>
      </Link>
      <Link
        href='/mypage/bookmark'
        className='w-[218px] h-[123px] bg-[#F4F4F4] flex flex-col items-center justify-center gap-8'
      >
        <p className='text-2xl font-bold'>3</p>
        <p className='text-sm'>찜한 모임</p>
      </Link>
      <Link
        href='/mypage/reviews'
        className='w-[218px] h-[123px] bg-[#F4F4F4] flex flex-col items-center justify-center gap-8'
      >
        <p className='text-2xl font-bold'>5</p>
        <p className='text-sm'>나의 리뷰</p>
      </Link>
    </div>
  );
}
