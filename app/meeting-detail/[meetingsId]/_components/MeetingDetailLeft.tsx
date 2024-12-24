import { IMeetingDetail } from '@/app/types';
import HeartIcon from '@/public/HeartIcon';
import InfoIcon from '@/public/InfoIcon';
import MeetingOwnerIcon from '@/public/MeetingOwnerIcon';
import ShareIcon from '@/public/ShareIcon';
import UserIcon from '@/public/UserIcon';
import Image from 'next/image';

export default function MeetingDetailLeft({ data }: IMeetingDetail) {
  return (
    <div className='w-[336px] sticky top-0 flex flex-col'>
      <div className='h-[189px] flex justify-center items-center relative bg-gray-300'>
        <Image
          src={`${data?.thumbnail}`}
          alt='meeting-thumbnail'
          layout='fill'
          objectFit='cover'
        />
      </div>
      <div className='text-[20px] mt-[16px] font-bold'>{data?.name}</div>
      <div className='h-[36px] flex flex-row items-center mt-[16px]'>
        <div className='w-[32px] h-[32px] border-[0.925px] border-[#D1D5DB] bg-white rounded-full flex justify-center items-center'>
          <UserIcon width={36} height={36} />
        </div>
        <div className='font-bold ml-[14px]'>{data?.owner}</div>
        <MeetingOwnerIcon width={16} height={16} className='ml-1' />
      </div>
      <div className='h-[65px] mt-[21px]'>
        <button className='w-full h-full text-lg bg-gray-300 font-bold'>
          모임 참여하기
        </button>
      </div>
      <div className='flex flex-row justify-center items-center text-xs mt-4'>
        <InfoIcon width={14} height={14} />
        채팅방은 모임 시작일부터 입장 가능합니다.
      </div>
      <div className='h-[24px] flex flex-row justify-center items-center gap-6 mt-5'>
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
