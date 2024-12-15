import ImageIcon from '../_svg/ImageIcon';
import MoreIcon from '../_svg/MoreIcon';
import NextIcon from '../_svg/NextIcon';
import PrevIcon from '../_svg/PrevIcon';
import { formatDateWithWeekday } from '@/app/_utils/dateFormatter';
import { MeetingList } from '@/types/meeting';
import Image from 'next/image';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

type Props = {
  meetingList: MeetingList[];
};
export default function MyMeetingList({ meetingList = [] }: Props) {
  return (
    <div className='relative w-full'>
      <div className='swiper-button-prev'>
        <PrevIcon />
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
          ({ id, name, startDate, endDate, bookImage, capacity }) => (
            <SwiperSlide key={id}>
              <div className='flex gap-5 w-[575px] h-[201x] bg-white p-4 rounded-sm border border-[rgba(0, 0, 0, 0.10)]'>
                <Image src={bookImage} width={132} height={200} alt='책 표지' />
                <div className='text-sm'>
                  <h3 className='text-lg mb-4'>{name}</h3>
                  <p className='text-sm mb-[2px]'>모임 기간 </p>
                  <p className='font-bold mb-2'>
                    {formatDateWithWeekday(startDate)}~{' '}
                    {formatDateWithWeekday(endDate)}
                  </p>
                  <p className='mb-1'>나의 독서 진행률 </p>
                  <div className='flex gap-2 mb-2.5'>
                    <div className='w-[363px] h-[15px] bg-[#D9D9D9] rounded-lg'>
                      <div className='w-[311px] h-[15px] bg-black rounded-lg'></div>
                    </div>
                    <span>12%</span>
                  </div>
                  <div className='flex items-center gap-1.5 w-[400px] h-[56px] px-2.5 py-1.5 bg-[#E4E4E4] rounded'>
                    <div className='flex -space-x-4 items-center'>
                      <ImageIcon width={44} height={44} />
                      <ImageIcon width={44} height={44} />
                      <ImageIcon width={44} height={44} />
                      <div className='p-2.5 rounded-full w-11 h-11 bg-[#DFDFDF]'>
                        <MoreIcon width={25} height={25} />
                      </div>
                    </div>
                    <p className='text-sm'>{capacity}명과 함께 읽는 중</p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ),
        )}{' '}
        <div className='swiper-button-next'>
          <NextIcon />
        </div>
      </Swiper>
    </div>
  );
}
