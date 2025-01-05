'use client';

import React, { useState } from 'react';
import Calendar from 'react-calendar';
import { useQuery } from '@tanstack/react-query';
import FilledHeartIcon from '../_svg/FilledHeartIcon';
import NextIcon from '../_svg/NextIcon';
import PrevIcon from '../_svg/PrevIcon';
import { IJoinableMeeting, IParticipatingMeeting } from '../types';
import CircularProgress from './CirclueProgressBar';
import { getJoinableMeetings } from './_lib/getJoinableMeetings';
import { getParticipatingMeetings } from './_lib/getParticipatingMeetings';
import { postWishMeeting } from './_lib/postWishMeeting';
import './custom-calendar.css';
import './custom-swiper.css';
import BlankHeartIcon from '@/app/_svg/BlankHeartIcon';
import { Button } from '@/components/ui/button';
import BookIcon from '@/public/BookIcon';
import CalendarIcon from '@/public/CalendarIcon';
import ChevronLeftIcon from '@/public/ChevronLeftIcon';
import ChevronRightIcon from '@/public/ChevronRightIcon';
import UsersIcon from '@/public/UsersIcon';
import useUserStore from '@/store/userStore';
import { format } from 'date-fns';
import { Ellipsis, User } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

type TileProps = {
  date: Date;
  view: string;
};

export default function MainPageHeader() {
  const today = new Date();
  const router = useRouter();
  const { user } = useUserStore();
  const [currentMeeting, setCurrentMeeting] = useState(1);

  const HandleloginStatus = () => {
    router.push('/auth/login');
  };

  const toggleWishMeeting = async (meetingId: number) => {
    try {
      await postWishMeeting(meetingId);
    } catch (error) {
      alert(`에러 발생 : ${error}`);
    }
  };

  const handleCurrentMeeting = (type: 'NEXT' | 'PREV') => {
    const currentValue = currentMeeting;
    if (currentValue === 1 && type === 'PREV') return null;
    if (currentValue === 3 && type === 'NEXT') return null;
    if (type === 'NEXT') {
      setCurrentMeeting(currentValue + 1);
    } else {
      setCurrentMeeting(currentValue - 1);
    }
  };

  const handleEnterMeeting = (meetingId: number) => {
    router.push(`/meeting-detail/${meetingId}`);
  };

  const {
    data: joinableMeetings,
    error: joinableMeetingsError,
    isLoading: joinableMeetingsIsLoading,
    isError: joinableMeetingsIsError,
  } = useQuery<IJoinableMeeting[]>({
    queryKey: ['joinableMeetings'],
    queryFn: () => getJoinableMeetings(),
    staleTime: 5 * 60 * 1000,
  });

  const {
    data: participatingMeetings,
    error: participatingMeetingsError,
    isLoading: participatingMeetingsIsLoading,
  } = useQuery<IParticipatingMeeting[]>({
    queryKey: ['participatingMeetings'],
    queryFn: () => getParticipatingMeetings(),
    staleTime: 5 * 60 * 1000,
    enabled: !!user,
  });

  if (joinableMeetingsIsError)
    return (
      <div>
        Error:{' '}
        {joinableMeetingsError instanceof Error
          ? joinableMeetingsError.message
          : 'Unknown error'}
        Error:{' '}
        {participatingMeetingsError instanceof Error
          ? participatingMeetingsError.message
          : 'Unknown error'}
      </div>
    );

  if (joinableMeetingsIsLoading || participatingMeetingsIsLoading)
    return <div>Loading datas...</div>;

  const tileClassName = ({ date }: TileProps) => {
    if (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    ) {
      return 'highlight-today';
    }
    return '';
  };

  const tileContent = ({ date, view }: TileProps) => {
    if (view === 'month') {
      const today = new Date();
      if (
        date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear()
      ) {
        return <span>{date.getDate()}</span>;
      }
    }
    return null;
  };

  return (
    <div className='h-[613px] flex justify-center items-center gap-20 bg-gradient-to-r from-[#FFF6E7] to-[#EAF7F2] py-8 px-40'>
      <div className='w-[542px] h-[493px] flex flex-col justify-between'>
        <h3 className='text-xl font-bold'>바로 참여해 보세요</h3>
        <h1 className='text-2xl font-bold mb-4'>오늘 시작인 독서 모임</h1>
        <div className='flex'>
          <Swiper
            spaceBetween={10}
            slidesPerView={1}
            navigation={true}
            modules={[Navigation]}
            className='custom-swiper'
          >
            {!joinableMeetings && (
              <div className='flex flex-row w-full h-[413px] rounded-lg bg-white shadow-md'>
                오늘 시작하는 모임이 없습니다.
              </div>
            )}
            {joinableMeetings &&
              joinableMeetings?.map((item, idx) => (
                <SwiperSlide key={idx}>
                  <div className='flex flex-row w-full h-[413px] rounded-lg bg-white shadow-md'>
                    <div className='flex justify-center items-center border-r-[1px] w-[271px] h-full px-4'>
                      <Image
                        src={item.bookImage}
                        alt='book-image'
                        width={271}
                        height={413}
                      />
                    </div>
                    <div className='flex flex-col px-4 py-7 justify-between'>
                      <div>
                        <h3 className='text-[22px] font-bold'>
                          {item?.bookTitle}
                        </h3>
                        <div className='bg-[#F3E7E7] w-auto inline-block mt-2 py-0.5 px-1.5 rounded-[4px]'>
                          <span className='text-customRed  text-sm font-bold'>
                            오늘부터 시작
                          </span>
                        </div>
                      </div>

                      <div>
                        <div className='h-[143px] flex flex-col items-start gap-[4px] text-customGrey-500'>
                          <div className='flex flex-row gap-2 items-center'>
                            <CalendarIcon width={24} height={24} />
                            <span className='text-lg'>
                              {item.gatheringWeek / 7}주 동안
                            </span>
                          </div>
                          <div className='flex flex-row gap-2 items-center'>
                            <BookIcon width={24} height={24} />
                            <span className='text-lg'>
                              매일 {item.readingTimeGoal}분
                            </span>
                          </div>
                          <div className='flex flex-row gap-2 items-center'>
                            <UsersIcon width={24} height={24} />
                            <span className='text-lg'>
                              {item.currentCapacity}명 /{' '}
                              {item.maxCapacity < 1000
                                ? `${item.maxCapacity}명`
                                : '∞'}
                            </span>
                          </div>

                          <div className='flex flex-row mt-[9px]'>
                            {item.currentCapacity < 4 ? (
                              <>
                                {item.userProfiles.map((_, idx) => (
                                  <React.Fragment key={idx}>
                                    <div className='w-12 h-12 border-[0.925px] border-[#D1D5DB] bg-white rounded-full -mr-3 flex justify-center items-center'>
                                      <User />
                                    </div>
                                  </React.Fragment>
                                ))}
                              </>
                            ) : (
                              <>
                                {item.userProfiles.map((item, idx) => (
                                  <React.Fragment key={idx}>
                                    {item ? (
                                      <div className='w-12 h-12 border-[0.925px] border-[#D1D5DB] bg-white rounded-full -mr-3 flex justify-center items-center'>
                                        <Image
                                          src={item}
                                          alt='user-profile-image'
                                          width={48}
                                          height={48}
                                        />
                                      </div>
                                    ) : (
                                      <div className='w-12 h-12 border-[0.925px] border-[#D1D5DB] bg-white rounded-full -mr-3 flex justify-center items-center'>
                                        <User />
                                      </div>
                                    )}
                                  </React.Fragment>
                                ))}
                                <div className='w-12 h-12 border-[0.925px] border-[#D1D5DB] bg-[#D1D5DB] rounded-full -mr-3 flex justify-center items-center'>
                                  <Ellipsis className='w-[1.5rem] h-[1.5rem]' />
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                        <div className='flex items-center justify-between h-12 mt-5 gap-1.5'>
                          <Button
                            className='w-[183px] h-full bg-customGreen-500 text-white'
                            onClick={() =>
                              router.push(`/meeting-detail/${item.id}`)
                            }
                          >
                            참여하기
                          </Button>
                          <button
                            className='text-lg'
                            onClick={() => toggleWishMeeting(item.id)}
                          >
                            {item.wish ? (
                              <FilledHeartIcon width={48} height={48} />
                            ) : (
                              <BlankHeartIcon width={48} height={48} />
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
          </Swiper>
        </div>
      </div>
      <div className='flex flex-col w-[445px] h-[493px]'>
        <div className='bg-white w-[445px] h-[80px] px-[1.875rem] border-b-[1px] border-customGrey-100 flex flex-row justify-between items-center'>
          {user ? (
            participatingMeetings?.map(
              (item, idx) =>
                currentMeeting === idx + 1 && (
                  <div
                    key={idx}
                    className='w-full h-full flex flex-row justify-between items-center'
                  >
                    <div className='flex flex-row gap-10 items-center'>
                      <CircularProgress value={60} max={100} />
                      <div>
                        <h3>지금 읽고 있는 책</h3>
                        <h4 className='font-bold'>{item.bookTitle}</h4>
                      </div>
                    </div>
                    <div>
                      <button
                        className='w-[84px] h-[40px] py-2 px-3 border-[1.5px] rounded-[4px] border-customGrey-200 text-sm'
                        onClick={() => handleEnterMeeting(item.id)}
                      >
                        입장하기
                      </button>
                    </div>
                  </div>
                ),
            )
          ) : (
            <>
              <div>
                <h3 className='font-bold'>로그인 후</h3>
                <h4>독서달력을 채워보세요</h4>
              </div>
              <button
                onClick={() => HandleloginStatus()}
                className='w-[100px] h-[40px] py-2 px-3 border-[1.5px] rounded-[4px] border-customGrey-200 text-sm'
              >
                로그인 하기
              </button>
            </>
          )}
        </div>
        <Calendar
          prev2Label={null}
          next2Label={null}
          prevLabel={<ChevronLeftIcon width={24} height={24} />}
          nextLabel={<ChevronRightIcon width={24} height={24} />}
          formatDay={(_, date) => format(date, 'd')}
          showNeighboringMonth={false}
          calendarType='gregory'
          tileClassName={tileClassName}
          tileContent={tileContent}
        />
        <div className='flex flex-row bg-white w-full h-12 py-[12px] px-[28px] gap-2 justify-end items-center'>
          <PrevIcon
            width={24}
            height={24}
            onClick={() => handleCurrentMeeting('PREV')}
            className={`cursor-pointer`}
          />
          참여중인 모임 {currentMeeting} / 3
          <NextIcon
            width={24}
            height={24}
            onClick={() => handleCurrentMeeting('NEXT')}
            className='cursor-pointer'
          />
        </div>
      </div>
    </div>
  );
}
