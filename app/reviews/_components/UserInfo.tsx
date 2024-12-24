import SlideNextIcon from '@/components/common/icons/SlideNextIcon';

export default function UserInfo() {
  return (
    <div className='flex items-center gap-4 p-5'>
      <div className='w-[60px] h-[60px] bg-[#A0A0A0] rounded-full'></div>
      <div>
        <p className='font-bold'>테스트</p>
        <div className='flex items-center'>
          <p className='text-customGrey-500'>작성한 독서 리뷰</p>
          <SlideNextIcon className='w-5 h-5' />
        </div>
      </div>
    </div>
  );
}
