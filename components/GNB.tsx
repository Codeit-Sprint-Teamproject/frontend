'use client';

import Avatar from './common/icons/Avatar';
import BellIcon from './common/icons/BellIcon';
import HeartIcon from './common/icons/HeartIcon';
import SearchBar from './ui/SearchBar';
import { Button } from '@/components/ui/button';
import Logo from '@/public/Logo';
import useUserStore, { UserProps } from '@/store/userStore';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const GNB = () => {
  const pathname = usePathname();
  const isSearchPage = pathname.startsWith('/search');
  const user = useUserStore((state) => state.user);
  const isLoggedIn = !!user;

  return (
    <div className='sticky top-0 z-[2] flex h-[72px] w-full items-center justify-between border-b bg-white px-[190px]'>
      <div className='flex h-full items-center justify-center gap-[60px]'>
        <Link href='/'>
          <Logo />
        </Link>
        <div className='flex gap-10 h-full'>
          <NavButton label='모임 찾기' href='/' active={pathname === '/'} />
          <NavButton
            label='독서 리뷰'
            href='/reviews'
            active={pathname === '/reviews'}
          />
        </div>
      </div>
      {isLoggedIn ? (
        <LoggedInMenu user={user} isSearchPage={isSearchPage} />
      ) : (
        <LoggedOutMenu isSearchPage={isSearchPage} />
      )}
    </div>
  );
};

const NavButton = ({
  label,
  href,
  active,
}: {
  label: string;
  href: string;
  active: boolean;
}) => (
  <Button
    asChild
    variant='ghost'
    className={`relative h-full px-1 text-[16px] font-bold text-customGrey-800 ${
      active
        ? 'pointer-events-none after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-customGrey-800'
        : ''
    }`}
  >
    <Link href={href}>{label}</Link>
  </Button>
);

const LoggedInMenu = ({
  user,
  isSearchPage,
}: {
  user: UserProps | null;
  isSearchPage: boolean;
}) => (
  <div className='flex items-center gap-6'>
    {!isSearchPage && <SearchBar />}
    <Link href='/mypage/meetings'>
      <HeartIcon className='h-7 w-7' />
    </Link>
    <BellIcon className='h-7 w-7' />
    <Link href='/mypage'>
      {user?.profile ? (
        <Image
          src={user.profile}
          alt='User Profile'
          width={32}
          height={32}
          className='rounded-full'
        />
      ) : (
        <Avatar width={32} height={32} />
      )}
    </Link>
    <Button
      asChild
      className='rounded-[4px] border-[1.5px] border-customGrey-200 bg-white px-3 py-2 text-[16px] font-medium text-customGrey-500 hover:font-bold hover:text-white'
    >
      <Link href='/create-gathering'>모임 만들기</Link>
    </Button>
  </div>
);

const LoggedOutMenu = ({ isSearchPage }: { isSearchPage: boolean }) => (
  <div className='flex gap-5'>
    {!isSearchPage && <SearchBar />}
    <div className='flex gap-[10px]'>
      <Button
        className='text-[14px] font-medium text-customGrey-500'
        variant='ghost'
      >
        <Link href='/auth/login'>로그인</Link>
      </Button>
      <Button className='bg-customGrey-800 px-3 py-2 text-[14px] font-bold text-white'>
        <Link href='/auth/signup'>회원가입</Link>
      </Button>
    </div>
  </div>
);

export default GNB;
