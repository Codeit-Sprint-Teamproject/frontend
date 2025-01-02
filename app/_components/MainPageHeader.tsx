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
    isError: participatingMeetingsIsError,
  } = useQuery<IParticipatingMeeting[]>({
    queryKey: ['participatingMeetings'],
    queryFn: () => getParticipatingMeetings(),
    staleTime: 5 * 60 * 1000,
  });

  if (joinableMeetingsIsError || participatingMeetingsIsError)
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

  return (
    <div className='h-[613px] flex justify-center items-center gap-20 bg-gradient-to-r from-[#FFF6E7] to-[#EAF7F2] py-8 px-40'>
      <div className='w-[542px] h-[493px] flex flex-col justify-center'>
        <h3 className='text-xl font-bold'>바로 참여해 보세요</h3>
        <h1 className='text-2xl font-bold mb-4'>오늘 시작인 독서 모임</h1>
        <div className='flex-1'>
          <Swiper
            spaceBetween={10}
            slidesPerView={1}
            navigation={true}
            modules={[Navigation]}
            className='custom-swiper'
          >
            {joinableMeetings?.map((item, idx) => (
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
                  <div className='flex flex-col px-4 py-7'>
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

                    <div className='mt-[75px]'>
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
                            {item.currentCapacity}명 / {item.maxCapacity}명
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
      {participatingMeetings?.slice(0, 1).map((item, idx) => (
        <div className='flex flex-col w-[445px] h-[493px]' key={idx}>
          <div className='bg-white w-[445px] h-[80px] px-[1.875rem] border-b-[1px] border-customGrey-100 flex flex-row justify-between items-center'>
            {/* TODO (희원) API에 달성률데이터가 없는 상태라 정보를 보여줄 수 없음 -> API 업데이트 되면 수정예정 */}
            {user ? (
              <>
                <div className='flex flex-row gap-10 items-center'>
                  <CircularProgress value={60} max={100} />
                  <div>
                    <h3>지금 읽고 있는 책</h3>
                    <h4 className='font-bold'>{item.bookTitle}</h4>
                  </div>
                </div>
                <div>
                  {/* TODO (희원) 입장하기버튼을 클릭했을때에 대한 동작이 정해지지 않음 -> 정해지는대로 구현예정 */}
                  <button className='w-[84px] h-[40px] py-2 px-3 border-[1.5px] rounded-[4px] border-customGrey-200 text-sm'>
                    입장하기
                  </button>
                </div>
              </>
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
          {/* TODO (희원) API에 모임출석에 대한 데이터가 없는 상태라 정보를 보여줄 수 없음 -> API 업데이트 되면 수정예정 */}
          <Calendar
            locale='en-GB'
            formatShortWeekday={(_, date) => format(date, 'EEE')}
            formatMonthYear={(locale, date) =>
              date.toLocaleString(locale, { month: 'short', year: 'numeric' })
            }
            view='month'
            prev2Label={null}
            next2Label={null}
            showNeighboringMonth={false}
            tileClassName={({ date, view }) =>
              view === 'month' && date.toDateString() === today.toDateString()
                ? 'highlight-today'
                : null
            }
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
      ))}
    </div>
  );
}
