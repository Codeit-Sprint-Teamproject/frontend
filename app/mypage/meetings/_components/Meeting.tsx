import Calendar from '../../_svg/Calendar';
import Users from '../../_svg/Users';
import { formatDateWithWeekday } from '@/app/_utils/dateFormatter';
import type { MyMeetingList } from '@/types/meeting';
import Image from 'next/image';

export default function Meeting({ meeting }: { meeting: MyMeetingList }) {
  const { name, bookImage, startDate, endDate, currentCapacity } = meeting;
  return (
    <div className='px-[14px] py-[18px] border border-[rgba(0, 0, 0, 0.10)] rounded-[8px]'>
      <div className='flex gap-5'>
        <Image src={bookImage} width={132} height={198} alt='책 표지' />
        <div className='flex flex-col gap-2.5 flex-1'>
          <div className='flex items-center justify-between'>
            <h3 className='text-lg font-bold'>{name}</h3>
            <div className='flex gap-1.5 w-44 h-8 px-2.5 py-1.5 text-sm bg-[#E4E4E4] rounded'>
              <Users width={16} height={17} />
              {currentCapacity}명과 함께 읽는 중
            </div>
          </div>
          <p>모임 기간</p>
          <div className='flex gap-2 font-bold'>
            <Calendar width={16} height={16} />
            {formatDateWithWeekday(startDate)}- {formatDateWithWeekday(endDate)}
          </div>
          <p>참여율</p>
          <div className='w-[200px] h-[15px] bg-[#D9D9D9] rounded-[8px]'></div>
        </div>
      </div>
    </div>
  );
}
