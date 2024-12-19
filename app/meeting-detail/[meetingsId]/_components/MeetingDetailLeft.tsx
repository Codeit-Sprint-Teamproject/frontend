import { useMeetingContext } from '../_lib/MeetingDetailContext';
import HeartIcon from '@/public/HeartIcon';
import ShareIcon from '@/public/ShareIcon';
import UserIcon from '@/public/UserIcon';
import Image from 'next/image';

export default function MeetingDetailLeft() {
  const { meetingData, loading, error } = useMeetingContext();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: 데이터를 불러오지 못했습니다.</div>;

  return (
    <div className='w-[336px] flex flex-col'>
      <div className='h-[189px] flex justify-center items-center relative bg-gray-300'>
        <Image
          src={`${meetingData?.thumbnail}`}
          alt='meeting-thumbnail'
          layout='fill'
          objectFit='cover'
        />
      </div>
      <div className='h-[60px] text-[20px] mt-[17px] font-bold'>
        {meetingData?.name}
      </div>
      <div className='h-[36px] flex flex-row items-center mt-[15px]'>
        <div className='w-[2rem] h-[2rem] border-[0.925px] border-[#D1D5DB] bg-white rounded-full flex justify-center items-center'>
          <UserIcon width={36} height={36} />
        </div>
        <div className='font-bold ml-[14px]'>{meetingData?.owner}</div>
      </div>
      <div className='h-[65px] mt-[21px]'>
        <button className='w-full h-full bg-gray-300 font-bold'>
          모임 함께하기
        </button>
      </div>
      <div className='h-[24px] flex flex-row justify-center items-center gap-6 mt-[36px]'>
        <div className='flex flex-row gap-2'>
          <ShareIcon width={24} height={24} />
          <span>공유하기</span>
        </div>
        <div className='flex flex-row gap-2'>
          <HeartIcon width={25} height={25} />
          <span>찜하기</span>
        </div>
      </div>
    </div>
  );
}
