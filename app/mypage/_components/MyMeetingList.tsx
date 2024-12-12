import ImageIcon from '../_svg/ImageIcon';
import MoreIcon from '../_svg/MoreIcon';
import { MeetingList } from '@/types/meeting';
import Image from 'next/image';

type Props = {
  meetingList: MeetingList[];
};
export default function MyMeetingList({ meetingList }: Props) {
  const { name, startDate, endDate, bookImage, capacity } = meetingList[0];
  console.log('start', startDate);
  return (
    <div className='flex gap-5 w-[575px] h-[201x] bg-white p-4 rounded-sm border border-[rgba(0, 0, 0, 0.10)]'>
      <Image src={bookImage} width={132} height={200} alt='책 표지' />
      <div className='text-sm'>
        <h3 className='text-lg mb-4'>{name}</h3>
        <p className='text-sm mb-[2px]'>모임 기간 </p>
        <p className='font-bold mb-2'>
          {new Date(startDate)
            .toLocaleString('ko', {
              month: '2-digit',
              day: '2-digit',
              weekday: 'short',
            })
            .replace(/(.*?\..*?)\./, '$1')}
          ~{' '}
          {new Date(endDate)
            .toLocaleString('ko', {
              month: '2-digit',
              day: '2-digit',
              weekday: 'short',
            })
            .replace(/(.*?\..*?)\./, '$1')}
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
  );
}
