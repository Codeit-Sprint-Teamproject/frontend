import MyMeetingList from './_components/MyMeetingList';
import MyReadingCalendar from './_components/MyReadingCalendar';
import Profile from './_components/Profile';

export default function page() {
  return (
    <div className='w-[750px]'>
      <h3 className='text-2xl font-semibold my-2 text-customGrey-800'>
        마이페이지
      </h3>
      <Profile />
      <MyMeetingList />
      <h4 className='text-lg font-bold mb-6 text-customGrey-800'>
        나의 독서 달력
      </h4>
      <MyReadingCalendar />
    </div>
  );
}
