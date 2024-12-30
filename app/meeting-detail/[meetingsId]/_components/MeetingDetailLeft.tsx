import { postJoinMeeting, postWishMeeting } from '../_lib/meetingDetail';
import { IMeetingDetail } from '@/app/types';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import HeartIcon from '@/public/HeartIcon';
import InfoIcon from '@/public/InfoIcon';
import MeetingOwnerIcon from '@/public/MeetingOwnerIcon';
import InfoIcon from '@/public/InfoIcon';
import MeetingOwnerIcon from '@/public/MeetingOwnerIcon';
import ShareIcon from '@/public/ShareIcon';
import UserIcon from '@/public/UserIcon';
import { Arrow } from '@radix-ui/react-tooltip';
import Error from 'next/error';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

interface ExtendedError extends Error {
  message: string;
  code?: string;
}

export default function MeetingDetailLeft({ data }: IMeetingDetail) {
  const pathname = usePathname();
  const meetingJoinBtnHandler = async () => {
    try {
      await postJoinMeeting(data.id);
      alert('모임에 성공적으로 참여하였습니다!');
    } catch (error) {
      const err = error as ExtendedError;
      if (err.message.includes('ALREADY_JOINED')) {
        alert('이미 이 모임에 참여 중입니다.');
        return;
      }
      alert(`에러 발생 : ${err.message}`);
    }
  };

  const meetingShareBtnHandler = () => {
    const fullUrl = `http://localhost:3000${pathname}`;

    navigator.clipboard
      .writeText(fullUrl)
      .then(() => {
        alert('모임 링크가 클립보드에 복사되었습니다!');
      })
      .catch((error) => {
        console.error('URL 복사 중 오류 발생:', error);
        alert('모임 링크 복사에 실패했습니다. 다시 시도해주세요.');
      });
  };

  const meetingBookmarkBtnHandler = async () => {
    try {
      await postWishMeeting(data.id);
      alert('모임을 성공적으로 찜했습니다!');
    } catch (error) {
      alert(`에러 발생 : ${error}`);
    }
  };

  return (
    <div className='w-[336px] flex flex-col'>
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
      <div className='text-[20px] mt-[16px] font-bold'>{data?.name}</div>
      <div className='h-[36px] flex flex-row items-center mt-[16px]'>
        <div className='w-[32px] h-[32px] border-[0.925px] border-[#D1D5DB] bg-white rounded-full flex justify-center items-center'>
          <UserIcon width={36} height={36} />
        </div>
        <div className='font-bold ml-[14px]'>{data?.owner}</div>
        <MeetingOwnerIcon width={16} height={16} className='ml-1' />
        <div className='font-bold ml-[14px]'>{data?.owner}</div>
        <MeetingOwnerIcon width={16} height={16} className='ml-1' />
      </div>
      <div className='h-[48px] mt-[21px]'>
        <button
          className='w-full h-full text-lg bg-customGreen-500 text-white font-bold rounded-[4px]'
          onClick={meetingJoinBtnHandler}
        >
          모임 참여하기
        </button>
      </div>
      <div className='flex flex-row justify-center items-center text-xs mt-3'>
        <InfoIcon width={14} height={14} />
        <span className='ml-2'>채팅방은 모임 시작일부터 입장 가능합니다.</span>
      </div>
      <div className='h-[24px] flex flex-row justify-center items-center gap-6 mt-6'>
        <TooltipProvider delayDuration={300}>
          <Tooltip delayDuration={300}>
            <TooltipTrigger>
              <div
                className='flex flex-row gap-2 cursor-pointer'
                onClick={meetingShareBtnHandler}
              >
                <ShareIcon width={24} height={24} />
                <span>공유하기</span>
              </div>
            </TooltipTrigger>
            <TooltipContent className='bg-black text-white' side='bottom'>
              <Arrow width={10} height={5} />
              <p>모임을 공유하고 함께 독서해보세요!</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <div
          className='flex flex-row gap-2 cursor-pointer'
          onClick={meetingBookmarkBtnHandler}
        >
          <HeartIcon width={25} height={25} />
          <span>찜하기</span>
        </div>
      </div>
    </div>
  );
}
