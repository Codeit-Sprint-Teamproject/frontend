import { completeReading } from '../_lib/completeReading';
import AlertModal from './AlertModal';
import { useTabContext } from './TabContext';
import { formatDateWithWeekday } from '@/app/_utils/dateFormatter';
import DropDown from '@/components/DropDown';
import Modal from '@/components/Modal';
import Avatar from '@/components/common/icons/Avatar';
import CalendarIcon from '@/components/common/icons/Calendar';
import MoreIcon from '@/components/common/icons/MoreIcon';
import { useModalStore } from '@/store/modal';
import { MyMeetingList } from '@/types/meeting';
import Image from 'next/image';

export default function Meeting({ meeting }: { meeting: MyMeetingList }) {
  const { tab } = useTabContext();
  const { isOpen, openModal } = useModalStore();
  const {
    id,
    name,
    bookImage,
    startDate,
    endDate,
    currentCapacity,
    readingRate,
  } = meeting;

  const handleComplete = async () => {
    try {
      await completeReading(id);
    } catch (error) {
      openModal(<AlertModal message={(error as Error).message} />);
    }
  };
  return (
    <div className='w-[696px] flex gap-5 bg-white pt-4 py-7 border-b'>
      <Image
        src={bookImage}
        className='w-[113px] h-[170px]'
        width={113}
        height={170}
        alt='책 표지'
        priority
      />
      <div className='w-3/4 text-sm'>
        <div className='flex justify-between'>
          <h3 className='text-lg text-customGrey-800 font-bold mb-2'>{name}</h3>
          <DropDown
            items={[{ text: '독서 완료하기', onClick: handleComplete }]}
          />
        </div>
        <div className='flex gap-[2px]'>
          <CalendarIcon className='w-[14px] h-4' />
          <p className='text-customGrey-500 text-sm mb-[2px]'>모임 기간 </p>
        </div>
        <p className='text-customGrey-800 mb-2'>
          {formatDateWithWeekday(startDate)} - {formatDateWithWeekday(endDate)}
        </p>
        <p className='text-customGrey-500 mb-1'>나의 독서 진행률 </p>
        <div className='flex gap-2 mb-2.5'>
          <div className='w-[489px] h-[15px] bg-customGrey-100 rounded-lg'>
            <div
              className='h-[15px] bg-customGreen-500 rounded-lg'
              style={{ width: `${489 * (readingRate / 100) || 0}px` }}
            ></div>
          </div>
          <span className='text-sm text-customGrey-800'>
            {readingRate || 0}%
          </span>
        </div>
        <div className='flex items-center gap-2 h-11 px-2 py-1.5 bg-customGreen-50 rounded'>
          <div className='flex -space-x-4 items-center'>
            <Avatar className='w-8 h-8' />
            <Avatar className='w-8 h-8' />
            <Avatar className='w-8 h-8' />
            <div className='p-2 rounded-full w-8 h-8 bg-[#DFDFDF]'>
              <MoreIcon className='w-[18px] h-[18px] stroke-customGrey-300' />
            </div>
          </div>
          <p className='text-sm text-customGreen-500'>
            {currentCapacity}명과 함께{' '}
            {/* TODO (유진) 만든 모임에서도 완료한 모임 여부 판단 추가할 예정 */}
            {tab === 'completed' ? '읽었어요' : '읽는 중'}
          </p>
        </div>
      </div>
      {isOpen && <Modal width='w-[300px]' />}
    </div>
  );
}
