'use client';

import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getMeetingInfo } from '../_lib/meetingDetail';
import BookInfo from './BookInfo';
import { IMeetingInfo } from '@/app/types';
import AvatarIcon from '@/public/AvatarIcon';
import ChevronDownIcon from '@/public/ChevronDownIcon';
import ClosedBookIcon from '@/public/ClosedBookIcon';

// const expectedReadingAmount = targetTime * goalDays;

interface MeetingInfoProps {
  gatheringId: number;
}

export default function MeetingInfo({ gatheringId }: MeetingInfoProps) {
  const [meetingInfo, setMeetingInfo] = useState<IMeetingInfo>();

  const { data, error, isLoading, isError } = useQuery({
    queryKey: ['meetingInfo', gatheringId],
    queryFn: () => getMeetingInfo(gatheringId),
    staleTime: 5 * 60 * 1000,
  });

  useEffect(() => {
    if (data?.result) {
      setMeetingInfo(data.result);
    }
  }, [data]);

  const [bookMoreInfoToggle, setBooMoreInfoToggle] = useState(false);
  // const meetingDuration = 모임기간(일) / 7

  const bookMoreInfoButtonHandler = () => {
    setBooMoreInfoToggle(!bookMoreInfoToggle);
  };

  if (isLoading) return <div>Loading meeting details...</div>;

  if (isError)
    return (
      <div>
        Error: {error instanceof Error ? error.message : 'Unknown error'}
      </div>
    );

  return (
    <>
      <div className='w-full'>
        <div>
          <h2 className='text-2xl font-bold'>주 동안</h2>
          <h2 className='text-2xl'>
            <span className='font-bold'></span>
            함께 읽어요
          </h2>
          <div className='p-[6px]'>
            <BookInfo
              bookImage={meetingInfo?.bookImage}
              bookTitle={meetingInfo?.bookTitle}
              author={meetingInfo?.author}
              publisher={meetingInfo?.publisher}
              publishDate={meetingInfo?.publishDate}
              star={meetingInfo?.star}
            />
          </div>
        </div>
        <div className='mt-[23px] border-b-[1px] border-[rgba(0, 0, 0, 0.10)]'>
          <h6 className='text-18px font-bold'>책소개</h6>
          <div
            className={`relative mt-[10px] ${bookMoreInfoToggle ? '' : 'h-[70px] overflow-y-hidden'}`}
          >
            <p>{meetingInfo?.introduce}</p>
            {!bookMoreInfoToggle && (
              <div className='absolute bottom-0 left-0 w-full h-[40px] bg-gradient-to-t from-white to-transparent pointer-events-none'></div>
            )}
          </div>
          {bookMoreInfoToggle ? (
            <div
              onClick={() => bookMoreInfoButtonHandler()}
              className='cursor-pointer flex flex-row justify-end'
            >
              <span>접기</span>
              <ChevronDownIcon width={24} height={24} />
            </div>
          ) : (
            <div
              onClick={() => bookMoreInfoButtonHandler()}
              className='cursor-pointer flex flex-row justify-end'
            >
              <span>더보기</span>
            </div>
          )}
        </div>
        <div className='mt-[35px]'>
          <h2 className='text-2xl font-bold'>목표 독서 시간</h2>
          <h2 className='text-2xl'>
            <span className='font-bold'>
              하루 {meetingInfo?.readingTimeGoal}분,{' '}
            </span>
            완독하지 않아도 괜찮아요
          </h2>
        </div>
        <div className='pb-[28px] border-b-[1px] border-[rgba(0, 0, 0, 0.10)]'>
          <div className='mt-[40px] '>
            <h6 className='text-[18px] font-bold'>독서 가이드</h6>
            <div className='mt-[10px] py-[16px] px-[12px] gap-[7px] flex flex-col bg-[#F8F8F8] text-[18px]'>
              <div className='flex flex-row items-center justify-start gap-[6px] text-[14px] text-gray-400'>
                <div className='flex flex-row py-[2px] px-[6px] rounded-[2px] bg-[#E0E0E0] gap-[4px] w-[45px] items-center justify-center'>
                  <ClosedBookIcon width={14} height={14} />
                  <span className=''>책</span>
                </div>
                <span>{meetingInfo?.bookTitle}</span>
              </div>
              {/* {expectedReadingAmount >= totalPages ? (
                <span className='font-bold text-[18px]'>
                  모임 기간 안에 완독할 가능성이 높은 책이에요!
                </span>
              ) : (
                <></>
              )} */}
              <span>전체 페이지 수 </span>
              <span>기간 내 예상 독서량 364페이지 이상</span>
            </div>
            <div className='mt-[20px] flex flex-col text-[18px]'>
              <span>
                하루 {meetingInfo?.readingTimeGoal}분이면 대략{' '}
                {meetingInfo?.readingTimeGoal} 페이지 정도 읽을 수 있어요!{' '}
              </span>
              <span>
                우리의 목표는 완독이 아니라 꾸준한 독서 습관을 만드는 거예요
              </span>
            </div>
          </div>
        </div>
        <div className='mt-[40px] pb-[28px] border-b-[1px] border-[rgba(0, 0, 0, 0.10)]'>
          <h3 className='text-[24px]'>
            <span className='font-bold'>모임장</span>을 소개할게요
          </h3>
          <div className='mt-[40px] flex flex-row justify-start items-center gap-[20px]'>
            <AvatarIcon width={60} height={60} />
            <h3 className='text-[24px]'>{meetingInfo?.owner}</h3>
          </div>
          <div className='mt-[36px] flex flex-col text-[18px]'>
            <span>안녕하세요!</span>
            <span>
              매일 조금씩 책을 읽으며 함께 좋은 독서 습관을 만들어 가요.
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
