'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getMeetingInfo } from '../_lib/meetingDetail';
import BookInfo from './BookInfo';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import AvatarIcon from '@/public/AvatarIcon';
import ChevronDownIcon from '@/public/ChevronDownIcon';
import ChevronUpIcon from '@/public/ChevronUpIcon';
import ClosedBookIcon from '@/public/ClosedBookIcon';
import InfoIcon from '@/public/InfoIcon';

interface MeetingInfoProps {
  gatheringId: number;
}

export default function MeetingInfo({ gatheringId }: MeetingInfoProps) {
  const { data, error, isLoading, isError } = useQuery({
    queryKey: ['meetingInfo', gatheringId],
    queryFn: () => getMeetingInfo(gatheringId),
    staleTime: 5 * 60 * 1000,
  });

  const expectReadingAmount = data?.readingTimeGoal * (data?.gatheringWeek / 7);

  const [bookMoreInfoToggle, setBooMoreInfoToggle] = useState(false);

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
      <div className='w-full mt-9'>
        <div>
          <h2 className='text-2xl font-bold'>
            {data?.gatheringWeek / 7}주 동안
          </h2>
          <h2 className='text-2xl'>
            <span className='font-bold'>{data?.bookTitle} </span>
            함께 읽어요
          </h2>
          <div className='mt-6 p-[6px]'>
            <BookInfo
              bookImage={data?.bookImage}
              bookTitle={data?.bookTitle}
              author={data?.author}
              publisher={data?.publisher}
              publishDate={data?.publishDate}
              star={data?.star}
            />
          </div>
        </div>
        <div className='mt-8 border-b-[1px] border-[rgba(0, 0, 0, 0.10)]'>
          <div className='flex flex-row gap-2'>
            <h6 className='text-18px font-bold'>책 소개</h6>
            <TooltipProvider delayDuration={300}>
              <Tooltip delayDuration={300}>
                <TooltipTrigger>
                  <InfoIcon width={24} height={24} />
                </TooltipTrigger>
                <TooltipContent side='bottom'>
                  <div className='h-5 rounded-1'>
                    알라딘에서 제공한 책 정보입니다.
                  </div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div
            className={`relative mt-[10px] ${bookMoreInfoToggle ? '' : 'h-[70px] overflow-y-hidden'}`}
          >
            <p>{data?.introduce}</p>
            {!bookMoreInfoToggle && (
              <div className='absolute bottom-0 left-0 w-full h-[40px] bg-gradient-to-t from-white to-transparent pointer-events-none'></div>
            )}
          </div>
          {bookMoreInfoToggle ? (
            <div
              onClick={() => bookMoreInfoButtonHandler()}
              className='cursor-pointer flex flex-row justify-end mb-3'
            >
              <span className='mr-1'>접어두기</span>
              <ChevronUpIcon width={24} height={24} />
            </div>
          ) : (
            <div
              onClick={() => bookMoreInfoButtonHandler()}
              className='cursor-pointer flex flex-row justify-end mb-3'
            >
              <span className='mr-1'>더보기</span>
              <ChevronDownIcon width={24} height={24} />
            </div>
          )}
        </div>
        <div className='mt-[90px]'>
          <h2 className='text-2xl font-bold'>목표 독서 시간</h2>
          <h2 className='text-2xl'>
            <span className='font-bold'>하루 {data?.readingTimeGoal}분, </span>
            독서 습관을 만들어요
          </h2>
        </div>
        <div className='mt-6 flex flex-col text-[18px]'>
          <span>
            하루 {data?.readingTimeGoal}분이면 대략 {data?.readingTimeGoal}
            페이지 정도 읽을 수 있어요!
          </span>
          <span>
            우리의 목표는 완독이 아니라 꾸준한 독서 습관을 만드는 거예요
          </span>
        </div>
        <div className='pb-[28px]'>
          <div className='mt-6 '>
            <div className='flex flex-row gap-1'>
              <h6 className='text-lg font-bold'>완독 예상</h6>
              <TooltipProvider delayDuration={300}>
                <Tooltip delayDuration={300}>
                  <TooltipTrigger>
                    <InfoIcon width={24} height={24} color='#A9A9A9' />
                  </TooltipTrigger>
                  <TooltipContent side='bottom'>
                    <div className='w-[374px] h-[94px] py-2 px-3 rounded-1 relative'>
                      <div className=''>
                        <div>
                          목표 독서시간(예: 30분) X 목표 독서 기간(예: 2주)
                        </div>
                        <div>= 기간 내 예상 독서량(420페이지)</div>
                        <div className='absolute bottom-2'>
                          * 1분에 1페이지를 읽는다고 가정했어요
                        </div>
                      </div>
                    </div>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <div className='mt-[10px] py-[16px] px-[12px] gap-[7px] flex flex-col bg-[#F8F8F8] text-[18px]'>
              <div className='flex flex-row items-center justify-start gap-[6px] text-[14px] text-gray-400'>
                <ClosedBookIcon width={18} height={18} />
                <span className='font-bold text-customGrey-500'>
                  {data?.bookTitle}
                </span>
                <span className='text-customGrey-300'>ㆍ</span>
                <span className='text-customGrey-300'>
                  총 {data?.bookTotalPage} 페이지
                </span>
              </div>
              {expectReadingAmount >= data?.totalpage ? (
                <span className='font-bold text-[16px]'>
                  모임 기간 안에 완독할 가능성이 높은 책이에요!
                </span>
              ) : (
                <span className='font-bold text-[16px]'>
                  완독 가능성은 낮지만 독서 습관을 만들기엔 충분해요
                </span>
              )}

              <hr />
              <div className='flex flex-row text-[14px]'>
                <span className='mr-2 text-customGrey-500'>
                  기간 내 예상 독서량
                </span>
                <span className='text-customGreen-500 font-medium'>
                  {expectReadingAmount} 페이지 이상
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className='mt-[40px] pb-[28px]'>
          <h3 className='text-[24px]'>
            <span className='font-bold'>모임장</span>을 소개할게요
          </h3>
          <div className='mt-[24px] flex flex-row justify-start items-center gap-[20px]'>
            <AvatarIcon width={60} height={60} />
            <h3 className='text-[24px]'>{data?.owner}</h3>
          </div>
          <div className='mt-[20px] flex flex-col text-[18px]'>
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
