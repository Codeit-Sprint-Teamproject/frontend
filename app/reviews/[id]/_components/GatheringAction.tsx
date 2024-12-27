export default function GatheringAction({ status }: { status: boolean }) {
  if (status) {
    <div className='flex justify-between items-center w-full h-14 bg-customGrey-50 p-2 rounded-[2px]'>
      <p className='text-customGrey-800'>현재 모집 중인 모임이 있어요.</p>
      <button className='px-3 py-2 bg-customGreen-50 text-customGreen-600 rounded-sm'>
        보러 가기
      </button>
    </div>;
  }
  return (
    <div className='flex justify-between items-center w-full h-14 bg-customGrey-50 p-2 rounded-[2px]'>
      <p className='text-customGrey-800'>
        현재 모집중인 모임이 없어요. 모임을 만들어 독서를 시작해 보세요
      </p>
      <button className='px-3 py-2 bg-customGreen-50 text-customGreen-600 rounded-sm'>
        모임 만들기
      </button>
    </div>
  );
}
