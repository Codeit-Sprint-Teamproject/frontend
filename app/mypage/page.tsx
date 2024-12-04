import NavigationCard from './_components/NavigationCard';
import Profile from './_components/Profile';

export default function MyPage() {
  return (
    <>
      <h3 className='text-[32px] font-semibold my-2'>마이페이지</h3>
      <Profile />
      <NavigationCard />
    </>
  );
}
