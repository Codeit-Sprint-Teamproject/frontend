import MeetingList from './_components/MeetingList';
import Tab from './_components/Tab';
import TabProvider from './_components/TabContext';

export default function MyMeetingPage() {
  return (
    <div className='w-[750px] p-5'>
      <h3 className='text-xl font-bold mb-[15px]'>나의 모임</h3>
      <TabProvider>
        <Tab />
        <MeetingList />
      </TabProvider>
    </div>
  );
}
