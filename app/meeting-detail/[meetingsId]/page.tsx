import MeetingDetailLeft from './_components/MeetingDetailLeft';
import MeetingDetailRight from './_components/MeetingDetailRight';
import MeetingDetailTabs from './_components/MeetingDetailTabs';

export default function MeetingDetailPage() {
  return (
    <div className='flex flex-col items-center justify-start mt-[131px] w-[1060px] mx-auto '>
      {/* 모임 상세페이지 메인 */}
      <div className='w-full h-[670px] flex flex-row justify-between'>
        {/* 메인 좌측 파트*/}
        <MeetingDetailLeft />
        {/* 메인 우측 파트*/}
        <MeetingDetailRight />
      </div>
      {/* 모임 상세페이지 탭스 */}
      <MeetingDetailTabs />
    </div>
  );
}
