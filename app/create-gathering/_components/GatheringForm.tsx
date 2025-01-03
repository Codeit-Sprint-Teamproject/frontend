'use client';

import { useEffect, useState } from 'react';
import BookSearchDialog from './BookSearchDialog';
import AddImageIcon from '@/components/common/icons/AddImage';
import InputReset from '@/components/common/icons/InputReset';
import { fetchAPIClient } from '@/lib/fetchAPI.client';
import { addDays, format, isToday } from 'date-fns';
import { ko } from 'date-fns/locale';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const gatheringWeekMap: Record<string, string> = {
  '1': 'ONE_WEEK',
  '2': 'TWO_WEEKS',
  '3': 'THREE_WEEKS',
  '4': 'FOUR_WEEKS',
  '5': 'FIVE_WEEKS',
  '6': 'SIX_WEEKS',
  '7': 'SEVEN_WEEKS',
  '8': 'EIGHT_WEEKS',
};

export interface GatheringFormData {
  name: string;
  content: string;
  startDate: string;
  endDate: string;
  minCapacity: number;
  maxCapacity: number;
  bookId: number | null;
  readingTimeGoal: string;
  gatheringWeek: string;
  file: File | null;
}

export interface Book {
  id: number;
  title: string;
  author: string;
  publisher: string;
  publisherDate: string;
  star: number;
  image: string;
}

interface GatheringFormProps {
  onSubmit: (formData: GatheringFormData) => void;
}

export default function GatheringForm({ onSubmit }: GatheringFormProps) {
  const readingTimeOptions: Record<number, string> = {
    10: 'TEN_MINUTES',
    30: 'THIRTY_MINUTES',
    60: 'ONE_HOUR',
    120: 'OVER_ONE_HOUR',
  };
  const router = useRouter();

  const [formName, setFormName] = useState('');
  const [bookInfo, setBookInfo] = useState<Book | null>(null);
  const [selectedDate, setSelectedDate] = useState(
    format(new Date(), 'yyyy-MM-dd'),
  );
  const [duration, setDuration] = useState('');
  const [endDate, setEndDate] = useState('');
  const [readingTime, setReadingTime] = useState(readingTimeOptions[30]);
  const [description, setDescription] = useState('');
  const [members, setMembers] = useState(4);
  const [isUnlimited, setIsUnlimited] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const today = new Date();
  const dates = Array.from({ length: 7 }, (_, index) => addDays(today, index));

  const handleCheckboxChange = () => {
    setIsUnlimited((prev) => !prev);
    if (!isUnlimited) {
      setMembers(1000);
    } else {
      setMembers(4);
    }
  };

  useEffect(() => {
    if (!duration || !selectedDate) return;

    const gatheringWeek = gatheringWeekMap[duration];

    const fetchEndDate = async () => {
      const res = await fetchAPIClient(
        `/api/gathering/calculate-end-date?startDate=${selectedDate}&gatheringWeek=${gatheringWeek}`,
        'GET',
      );

      if (res?.result) {
        setEndDate(res.result);
      } else {
        console.error('종료일 계산 실패:', res?.message || '알 수 없는 오류');
      }
    };

    fetchEndDate();
  }, [duration, selectedDate]);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setImageFile(event.target.files[0]);
    }
  };

  const handleFileDelete = () => {
    setImageFile(null);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    onSubmit({
      name: formName,
      content: description,
      startDate: selectedDate,
      endDate,
      minCapacity: members + 1,
      maxCapacity: members + 2,
      bookId: bookInfo?.id || null,
      readingTimeGoal: readingTime,
      gatheringWeek: gatheringWeekMap[duration],
      file: imageFile,
    });
  };

  return (
    <form onSubmit={handleSubmit} className='w-full max-w-[700px]'>
      <div className='border-b border-customGrey-100 rounded-sm mb-7'>
        <input
          type='text'
          name='name'
          placeholder='모임 이름을 입력해 주세요.'
          value={formName}
          onChange={(e) => setFormName(e.target.value)}
          className='text-2xl font-bold mb-7 w-full'
        />
      </div>

      <div className='mb-9 px-4 py-5 bg-customGrey-50'>
        <label className='block text-[18px] font-bold text-customGrey-800 mb-[18px]'>
          어떤 책을 함께 읽을까요?
        </label>
        <BookSearchDialog bookInfo={bookInfo} setBookInfo={setBookInfo} />
      </div>

      <div className='flex flex-col gap-10 bg-customGrey-50 rounded-sm px-4 py-5 mb-9'>
        <div className='mb-5'>
          <label className='block text-[18px] font-bold text-customGrey-800 mb-1'>
            언제 모임을 시작할까요?
          </label>
          <p className='text-sm text-customGrey-300 mb-[18px]'>
            오늘부터 1주일 내 만 선택할 수 있어요
          </p>
          <div className='flex gap-[10px]'>
            {dates.map((date) => (
              <button
                key={format(date, 'yyyy-MM-dd')}
                type='button'
                onClick={() => setSelectedDate(format(date, 'yyyy-MM-dd'))}
                className={`w-[60px] h-[60px] px-3 rounded-sm border ${
                  selectedDate === format(date, 'yyyy-MM-dd')
                    ? 'bg-customGreen-500 text-white border-customGreen-500'
                    : 'bg-white text-customGrey-800 border-customGrey-100'
                }`}
              >
                <div className='text-base font-normal'>
                  {isToday(date) ? '오늘' : format(date, 'EEE', { locale: ko })}
                </div>
                <div className='text-base font-normal'>{format(date, 'd')}</div>
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className='block text-[18px] font-bold text-customGrey-800 mb-[18px]'>
            모임은 몇 주 동안 진행할까요?
          </label>
          <div className='flex flex-wrap gap-1 justify-start w-[370px]'>
            {[1, 2, 3, 4, 5, 6, 7, 8].map((week) => (
              <button
                key={week}
                type='button'
                onClick={() => setDuration(week.toString())}
                className={`px-3 py-[10px] rounded-sm border text-base font-normal ${
                  duration === week.toString()
                    ? 'bg-customGreen-500 text-white border-customGreen-500'
                    : 'bg-white text-customGrey-800 border-customGrey-100'
                }`}
              >
                {week}주 동안
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className='flex flex-col gap-[60px] bg-customGrey-50 rounded-sm px-4 py-5 mb-9'>
        <div>
          <label className='block text-[18px] font-bold text-customGrey-800 mb-[18px]'>
            몇 명과 함께 읽을까요?
          </label>
          <div className='flex items-center gap-3'>
            <div className='flex items-center'>
              <button
                type='button'
                onClick={() => setMembers((prev) => Math.max(4, prev - 1))}
                disabled={isUnlimited}
                className={`w-[60px] h-11 px-3 py-2 rounded-l-sm border border-black/10 ${
                  isUnlimited
                    ? 'bg-customGrey-100 opacity-50 cursor-not-allowed'
                    : 'bg-white'
                }`}
              >
                -
              </button>
              <span
                className={`flex border-y border-black/10 items-center justify-center w-[60px] h-11 text-center ${
                  isUnlimited ? 'bg-customGrey-100' : 'bg-white'
                }`}
              >
                {isUnlimited ? (
                  <p className='text-xs'>제한 없음</p>
                ) : (
                  `${members}명`
                )}
              </span>
              <button
                type='button'
                onClick={() => setMembers((prev) => prev + 1)}
                disabled={isUnlimited}
                className={`w-[60px] h-11 px-3 py-2 rounded-r-sm border border-black/10 ${
                  isUnlimited
                    ? 'bg-customGrey-100 opacity-50 cursor-not-allowed'
                    : 'bg-white'
                }`}
              >
                +
              </button>
            </div>

            <div className='flex items-center'>
              <input
                type='checkbox'
                id='unlimited'
                checked={isUnlimited}
                onChange={handleCheckboxChange}
                className='w-6 h-6 mr-2 rounded border border-customGrey-100'
              />
              <label htmlFor='unlimited' className='text-customGrey-800'>
                제한 없음
              </label>
            </div>
          </div>
        </div>

        <div>
          <label className='block text-[18px] font-bold text-customGrey-800 mb-[18px]'>
            목표 독서 시간은 몇 분으로 할까요?
          </label>
          <div className='flex gap-1'>
            {[10, 30, 60, 120].map((time) => (
              <button
                key={time}
                type='button'
                onClick={() => setReadingTime(readingTimeOptions[time])}
                className={`px-3 py-[10px] text-base rounded-md border font-medium ${
                  readingTime === readingTimeOptions[time]
                    ? 'bg-customGreen-500 text-white border-customGreen-500'
                    : 'bg-white text-customGrey-800 border-customGrey-100'
                }`}
              >
                {time < 60 ? `${time}분` : time === 60 ? '1시간' : '1시간 이상'}
              </button>
            ))}
          </div>
        </div>

        <div className='flex justify-center items-center bg-customGreen-50 border border-customGreen-500 rounded-sm py-5'>
          <div className='flex flex-col items-center justify-center flex-1 border-r border-customGrey-200'>
            <p className='text-base font-medium text-customGrey-500 mb-2'>
              시작일
            </p>
            <p className='text-lg font-bold text-customGrey-800'>
              {format(new Date(selectedDate), 'MM월 dd일 EEEE', { locale: ko })}
            </p>
          </div>
          <div className='flex flex-col items-center justify-center  flex-1'>
            <p className='text-base font-medium text-customGrey-500 mb-2'>
              종료일
            </p>
            <p className='text-lg font-bold text-customGrey-800'>
              {endDate
                ? format(new Date(endDate), 'MM월 dd일 EEEE', { locale: ko })
                : '기간을 선택하세요'}
            </p>
          </div>
        </div>
      </div>

      <div className='flex flex-col mb-7 border w-full h-[267px] border-customGrey-200 rounded-sm px-4 py-5'>
        <label className='block text-[18px] font-bold text-customGrey-800 mb-4'>
          모임장을 소개해 주세요.
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          placeholder='예) 안녕하세요! 매일 조금씩 책을 읽으며 함께 좋은 독서 습관을 만들어 가요'
          className='w-full h-full text-sm focus:outline-none'
        ></textarea>
        <div className='relative w-auto'>
          {imageFile ? (
            <div className='relative'>
              <Image
                src={URL.createObjectURL(imageFile)}
                alt='Uploaded'
                width={120}
                height={120}
                className='object-cover rounded-sm'
                unoptimized
              />
              <button
                onClick={handleFileDelete}
                className='absolute left-[-12px] top-[-12px]'
              >
                <InputReset className='w-6 h-6 text-customGrey-500' />
              </button>
            </div>
          ) : (
            <label
              htmlFor='file-upload'
              className='flex items-center cursor-pointer text-customGrey-500 text-sm'
            >
              <div className='flex items-center gap-[6px] text-base text-customGrey-300'>
                <AddImageIcon className='w-6 h-6 text-customGrey-300' />
                대표 이미지 추가
              </div>
              <input
                id='file-upload'
                type='file'
                accept='image/*'
                className='hidden'
                onChange={handleFileSelect}
              />
            </label>
          )}
        </div>
      </div>

      <div className='flex justify-end gap-4'>
        <button
          type='button'
          className='px-3 py-2 bg-gray-200 rounded-sm font-medium text-base'
          onClick={() => router.push('/')}
        >
          취소
        </button>
        <button
          type='submit'
          className='px-3 py-2 bg-customGreen-500 font-medium text-white rounded-sm text-base'
        >
          등록하기
        </button>
      </div>
    </form>
  );
}
