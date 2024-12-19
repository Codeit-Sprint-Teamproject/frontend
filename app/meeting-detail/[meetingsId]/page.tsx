import MeetingDetailLeft from './_components/MeetingDetailLeft';
import MeetingDetailRight from './_components/MeetingDetailRight';
import MeetingDetailTabs from './_components/MeetingDetailTabs';
import { MeetingProvider } from './_lib/MeetingDetailContext';

export default function MeetingDetailPage() {
  return (
    <MeetingProvider>
      <div className='flex flex-col items-center justify-start mt-[131px] w-[1060px] h-[2000px] mb-20 mx-auto '>
        <div className='w-full h-[670px] flex flex-row justify-between'>
          <MeetingDetailLeft />
          <MeetingDetailRight />
        </div>
        <MeetingDetailTabs />
      </div>
    </MeetingProvider>
  );
}
