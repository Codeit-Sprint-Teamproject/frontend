import Tab from './_components/Tab';
import TabProvider from './_components/TabContext';

export default function MyMeetingPage() {
  return (
    <div>
      <h3 className='text-xl font-bold mb-[15px]'>나의 모임</h3>
      <TabProvider>
        <Tab />
      </TabProvider>
    </div>
  );
}
