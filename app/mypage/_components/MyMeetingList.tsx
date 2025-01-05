'use client';

import { useQuery } from '@tanstack/react-query';
import { getActiveMeetings } from '../_lib/getActiveMeetings';
import { formatDateWithWeekday } from '@/app/_utils/dateFormatter';
import Avatar from '@/components/common/icons/Avatar';
import MoreIcon from '@/components/common/icons/MoreIcon';
import SlideNextIcon from '@/components/common/icons/SlideNextIcon';
import SlidePrevIcon from '@/components/common/icons/SlidePrevIcon';
import Image from 'next/image';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

export default function MyMeetingList() {
  const { data: meetingList = [] } = useQuery({
    queryKey: ['mypage', 'meetings', 'active', 'preview'],
    queryFn: getActiveMeetings,
  });
  return (
    <div className='relative w-full'>
      <div className='swiper-button-prev'>
        <SlidePrevIcon className='w-6 h-6' />
      </div>
      <Swiper
        className='relative z-0'
        slidesPerView={1}
        spaceBetween={200}
        pagination={{ type: 'custom' }}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }}
        modules={[Navigation, Pagination]}
      >
        {meetingList?.map(
          ({
            id,
            name,
            startDate,
            endDate,
            bookImage,
            currentCapacity,
            readingRate,
            userProfiles,
          }) => (
            <SwiperSlide key={id}>
              <div className='flex gap-5 w-[590px] h-[201x] bg-white px-6 py-5 rounded-sm border border-[rgba(0, 0, 0, 0.10)]'>
                <Image
                  src={bookImage}
                  width={132}
                  height={198}
                  className='w-[132px] h-[198px]'
                  alt='책 표지'
                />
                <div className='flex-1 text-sm'>
                  <h3 className='text-lg mb-2 text-black font-bold'>{name}</h3>
                  <p className='text-sm mb-[2px]'>모임 기간 </p>
                  <p className='font-bold mb-2'>
                    {formatDateWithWeekday(startDate)} -{' '}
                    {formatDateWithWeekday(endDate)}
                  </p>
                  <p className='text-black mt-4'>나의 독서 진행률 </p>
                  <div className='flex items-center gap-2 mb-2.5'>
                    <div className='w-[352px] h-[15px] bg-[#D9D9D9] rounded-lg'>
                      <div
                        className='h-[15px] bg-customGreen-500 rounded-lg'
                        style={{
                          width: `${352 * ((readingRate || 0) / 100)}px`,
                        }}
                      ></div>
                    </div>
                    <span className='text-sm text-customGrey-500'>
                      {readingRate || 0}%
                    </span>
                  </div>
                  <div className='flex items-center gap-1.5 h-12 px-2.5 py-1.5 bg-customGreen-50 rounded w-[380px]'>
                    <div className='flex -space-x-4 items-center'>
                      {Array.from({ length: Math.min(3, currentCapacity) }).map(
                        (_, i) =>
                          userProfiles[i] ? (
                            <Image
                              key={i}
                              src={userProfiles[i]}
                              className='rounded-full'
                              width={32}
                              height={32}
                              alt='프로필'
                            />
                          ) : (
                            <Avatar key={i} className='w-8 h-8' />
                          ),
                      )}
                      <div className='p-2 rounded-full w-8 h-8 bg-customGrey-100'>
                        <MoreIcon className='w-4 h-4' />
                      </div>
                    </div>
                    <p className='text-sm text-customGreen-500'>
                      {currentCapacity}명과 함께 읽는 중
                    </p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ),
        )}{' '}
        <div className='swiper-button-next'>
          <SlideNextIcon className='w-6 h-6' />
        </div>
      </Swiper>
    </div>
  );
}
