import ImageIcon from '../../_svg/ImageIcon';
import MoreIcon from '../../_svg/MoreIcon';
import { useTabContext } from './TabContext';
import { formatDateWithWeekday } from '@/app/_utils/dateFormatter';
import { MyMeetingList } from '@/types/meeting';
import Image from 'next/image';

export default function Meeting({ meeting }: { meeting: MyMeetingList }) {
  const { tab } = useTabContext();
  const { name, bookImage, startDate, endDate, currentCapacity } = meeting;
  return (
    <div className='w-[701px] flex gap-5 bg-white p-[15px] rounded-sm border border-[rgba(0, 0, 0, 0.10)]'>
      <div className='border border-[rgba(0, 0, 0, 0.10)] bg-white p-1'>
        <Image src={bookImage} width={132} height={200} alt='책 표지' />
      </div>
      <div className='w-3/4 text-sm'>
        <h3 className='text-lg mb-4'>{name}</h3>
        <p className='text-sm mb-[2px]'>모임 기간 </p>
        <p className='mb-2'>
          {formatDateWithWeekday(startDate)} - {formatDateWithWeekday(endDate)}
        </p>
        <p className='mb-1'>나의 독서 진행률 </p>
        <div className='flex gap-2 mb-2.5'>
          <div className='w-[489px] h-[15px] bg-[#D9D9D9] rounded-lg'>
            <div className='w-[311px] h-[15px] bg-black rounded-lg'></div>
          </div>
          {/* TODO (유진) 목표 달성률 데이터 있을 때 변경할 예정 */}
          <span>12%</span>
        </div>
        <div className='flex items-center gap-1.5 w-full h-[56px] px-2.5 py-1.5 bg-[#E4E4E4] rounded'>
          <div className='flex -space-x-4 items-center'>
            <ImageIcon width={44} height={44} />
            <ImageIcon width={44} height={44} />
            <ImageIcon width={44} height={44} />
            <div className='p-2.5 rounded-full w-11 h-11 bg-[#DFDFDF]'>
              <MoreIcon width={25} height={25} />
            </div>
          </div>
          <p className='text-sm'>
            {currentCapacity}명과 함께{' '}
            {tab === 'active' ? '읽는 중' : '읽었어요'}
          </p>
        </div>
      </div>
    </div>
  );
}
