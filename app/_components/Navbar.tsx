import Link from 'next/link';

export default function Navbar() {
  return (
    <>
      {/* Navbar 컨테이너 */}
      <nav className='flex flex-row w-full h-[2rem] items-center justify-around p-10 bg-orange-300'>
        {/* 서비스 메뉴 */}
        <div className='flex flex-row gap-8'>
          <Link href='/' className=''>
            모읽지
          </Link>
          <Link href='/search' className=''>
            모임찾기
          </Link>
          <Link href='/reviews' className=''>
            독서 리뷰
          </Link>
        </div>
        {/* 서비스 기능 */}
        <div className='flex flex-row gap-8'>
          <Link href='/search' className=''>
            검색
          </Link>
          <Link href='/' className=''>
            알림
          </Link>
          <Link href='/bookmark' className=''>
            찜
          </Link>
          <Link href='/mypage' className=''>
            프로필사진
          </Link>
          <Link href='/' className=''>
            모임 만들기
          </Link>
        </div>
      </nav>
    </>
  );
}
