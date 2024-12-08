import MyReadingCalendar from './_components/MyReadingCalendar';
import Profile from './_components/Profile';

export default function page() {
  return (
    <div className='w-[750px] p-5'>
      <h3 className='text-[32px] font-semibold my-2'>마이페이지</h3>
      <Profile />
      <h4 className='text-xl font-bold mb-5'>나의 독서 달력</h4>
      <MyReadingCalendar />
    </div>
  );
}
