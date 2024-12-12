import HeartIcon from '@/public/HeartIcon';
import ShareIcon from '@/public/ShareIcon';
import UserIcon from '@/public/UserIcon';

export default function MeetingDetailLeft() {
  return (
    <div className='w-[336px] flex flex-col'>
      <div className='h-[189px] flex justify-center items-center bg-gray-300'>
        이미지 영역
      </div>
      <div className='h-[60px] text-[20px] mt-[17px] font-bold'>
        [매일 30분 읽기] 한강 디에센셜 함께 읽어요!
      </div>
      <div className='h-[36px] flex flex-row items-center mt-[15px]'>
        <div className='w-[2rem] h-[2rem] border-[0.925px] border-[#D1D5DB] bg-white rounded-full flex justify-center items-center'>
          <UserIcon width='36px' height='36px' />
        </div>
        <div className='font-bold ml-[14px]'>닉네임</div>
      </div>
      <div className='h-[65px] mt-[21px]'>
        <button className='w-full h-full bg-gray-300 font-bold'>
          모임 함께하기
        </button>
      </div>
      <div className='h-[24px] flex flex-row justify-center items-center gap-6 mt-[36px]'>
        <div className='flex flex-row gap-2'>
          <ShareIcon width='24px' height='24px' />
          <span>공유하기</span>
        </div>
        <div className='flex flex-row gap-2'>
          <HeartIcon width='25px' height='25px' />
          <span>찜하기</span>
        </div>
      </div>
    </div>
  );
}
