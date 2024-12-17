'use client';

import { useEffect, useMemo, useState } from 'react';
import Calendar from 'react-calendar';
import { fetchPopularBooks } from '../_services/popularBooks';
import { useMeetingsInfiniteQuery } from '../_services/useMeetingsInfiniteQuery';
import { IFilterState, IMeeting, IPopularBooks } from '../types';
import CustomDropdown from './CustomDropdown';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import BookIcon from '@/public/BookIcon';
import CalendarDotIcon from '@/public/CalendarDotIcon';
import CalendarIcon from '@/public/CalendarIcon';
import ChevronDown from '@/public/ChevronDown';
import RotateCw from '@/public/RotateCw';
import SearchIcon from '@/public/SearchIcon';
import UsersIcon from '@/public/UsersIcon';
import { format } from 'date-fns';
import Image from 'next/image';

export default function MainPageBody() {
  const [meetingsData, setMeetingsData] = useState<IMeeting[]>([]);
  const [popularBooks, setPopularBooks] = useState<IPopularBooks[]>([]);
  const [filterState, setFilterState] = useState<IFilterState>({
    startDate: null,
    recruitingOnly: true,
    targetTime: null,
  });
  const [searchBarHasText, setSearchBarHasText] = useState(false);
  const { data, isLoading, isError, error } = useMeetingsInfiniteQuery();
  const today = new Date();

  useEffect(() => {
    if (data?.pages[0]) {
      setMeetingsData(data?.pages[0].gatheringResponses);
    }
  }, [data]);

  useEffect(() => {
    const loadPopularBooks = async () => {
      try {
        const data = await fetchPopularBooks({ page: 0, size: 5 });
        setPopularBooks(data.result);
      } catch (error) {
        console.error(
          '모임을 많이 만들어낸 책 데이터를 불러오지 못했습니다 :',
          error,
        );
      }
    };

    loadPopularBooks();
  }, []);

  const filteredMeetings = useMemo(() => {
    return meetingsData
      .filter((meeting) => {
        if (filterState.startDate) {
          return new Date(meeting.startDate) >= filterState.startDate;
        }
        return true;
      })
      .filter((meeting) => {
        if (filterState.recruitingOnly) {
          return meeting.gatheringStatus === 'RECRUITING';
        }
        return true;
      });
  }, [meetingsData, filterState]);

  const resetFilters = () => {
    setFilterState({
      startDate: null,
      recruitingOnly: true,
      targetTime: null,
    });
  };

  const handleFilterChange = <K extends keyof IFilterState>(
    key: K,
    value: IFilterState[K],
  ) => {
    setFilterState((prev) => ({ ...prev, [key]: value }));
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <>
      <div className='mt-20 h-[1500px] flex flex-col items-center justify-start'>
        <div className='flex flex-col items-center gap-4 mb-20'>
          <h2 className='text-4xl font-bold mb-4'>모여서 읽고 싶은 지금</h2>
          <div className='relative w-[32.5625rem]'>
            {!searchBarHasText && (
              <div className='absolute top-1/2 left-4 transform -translate-y-1/2 flex items-center text-gray-400 pointer-events-none'>
                <SearchIcon width={24} height={24} />
                <span className='ml-2'>
                  원하는 책과 관련된 모임을 검색해보세요!
                </span>
              </div>
            )}
            <Input
              className='w-full h-[3.5rem] pl-12'
              onChange={(e) => setSearchBarHasText(!!e.target.value)}
            />
          </div>
        </div>
        <div className='w-[70rem] h-[30rem]'>
          <div className='mb-4'>
            <h2 className='text-xl font-bold'>많은 모임을 만들어낸 책</h2>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-5 gap-4 '>
            {popularBooks.map((book, idx) => (
              <div
                key={idx}
                className='h-[18rem] border rounded-lg shadow-md p-4 hover:shadow-lg relative'
                style={{
                  backgroundImage: `url(${book.bookImage})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                }}
              >
                <p className='text-xs text-white bg-gray-500 py-[8px] px-[8px] w-[auto] h-auto flex flex-row absolute right-2 bottom-2'>
                  모집중인 모임
                  <span className='ml-2'>{book.gatheringCount}</span>
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className='w-[70rem]'>
          <div className='mb-4'>
            <h2 className='text-xl font-bold mt-[82.13px]'>
              어디서든 독서를 시작해요
            </h2>
          </div>
          {/* FUNCTION PART */}
          <div className='flex flex-row items-center mb-2'>
            {(filterState.startDate || filterState.targetTime) && (
              <div
                className='bg-gray-300 py-[5px] px-[10px] rounded-[30px] hover:bg-gray-400 duration-150 ml-2 flex flex-row gap-2 items-center font-bold'
                onClick={resetFilters}
              >
                초기화
                <RotateCw width={24} height={24} />
              </div>
            )}
            <div className='bg-gray-300 py-[5px] px-[10px] rounded-[30px] hover:bg-gray-400 duration-150 ml-2 flex flex-row gap-2 items-center font-bold'>
              <CustomDropdown
                trigger={
                  filterState.startDate
                    ? filterState.startDate.toLocaleDateString()
                    : '시작일 선택'
                }
                label='시작일 선택'
              >
                <Calendar
                  locale='en-GB'
                  formatShortWeekday={(_, date) => format(date, 'EEE')}
                  formatMonthYear={(locale, date) =>
                    date.toLocaleString(locale, {
                      month: 'short',
                      year: 'numeric',
                    })
                  }
                  view='month'
                  prev2Label={null}
                  next2Label={null}
                  showNeighboringMonth={false}
                  tileClassName={({ date }) => {
                    const isToday =
                      date.toDateString() === today.toDateString();
                    const isSelected =
                      filterState.startDate &&
                      date.toDateString() ===
                        filterState.startDate.toDateString();

                    return [
                      isToday ? 'highlight-today' : '',
                      isSelected ? 'selected-date' : '',
                    ].join(' ');
                  }}
                  onChange={(date) => {
                    if (Array.isArray(date)) {
                      handleFilterChange('startDate', date[0]);
                    } else {
                      handleFilterChange('startDate', date);
                    }
                  }}
                  value={filterState.startDate}
                />
              </CustomDropdown>
              <CalendarIcon width={24} height={24} />
            </div>
            <div className='bg-gray-300 py-[5px] px-[10px] rounded-[30px] hover:bg-gray-400 duration-150 ml-2 flex flex-row gap-1 items-center font-bold'>
              <CustomDropdown
                trigger={
                  filterState.targetTime
                    ? filterState.targetTime
                    : '목표 독서 시간'
                }
                items={['10분', '10분 ~ 30분', '30분 ~ 1시간', '1시간 이상']}
                onSelect={(value) => handleFilterChange('targetTime', value)}
              />
              <ChevronDown width={24} height={24} />
            </div>
            <div className='py-[5px] px-[10px] flex items-center ml-2 gap-2'>
              <Label htmlFor='recruiting-only'>모집중만 보기</Label>
              <Switch
                id='recruiting only'
                checked={filterState.recruitingOnly}
                onCheckedChange={(checked) =>
                  handleFilterChange('recruitingOnly', checked)
                }
              />
            </div>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
            {filteredMeetings.map((meeting) => (
              <div
                key={meeting.id}
                className='h-[298px] border rounded-lg shadow-md hover:shadow-lg bg-white flex flex-col'
              >
                <div className='w-full h-[148px] flex justify-center items-center bg-[#D9D9D9]'>
                  <Image
                    src={meeting.thumbnail}
                    alt='meeting-thumbnail-image'
                    width={360}
                    height={148}
                    style={{ width: 360, height: 148 }}
                  />
                </div>
                <div className='flex flex-row p-4'>
                  <div className='w-[87.8px] h-[132px] -mt-10 mr-3 flex justify-center items-center'>
                    <Image
                      src={meeting.bookImage}
                      alt='meeting-bookcover-image'
                      width={360}
                      height={148}
                      style={{ width: 360, height: 148 }}
                    />
                  </div>
                  <div>
                    <h3 className='text-lg font-semibold mb-3'>
                      {meeting.name}
                    </h3>
                    <div className='flex flex-row gap-[2px]'>
                      <UsersIcon width={16} height={16} />
                      <p className='text-sm text-gray-600'>
                        {meeting.currentCapacity}명 / {meeting.maxCapacity}명
                      </p>
                    </div>
                    <div className='flex flex-row gap-[2px]'>
                      <CalendarDotIcon width={16} height={16} />
                      <p className='text-sm text-gray-600'>
                        {meeting.gatheringWeek / 7}주 동안
                      </p>
                    </div>
                    <div className='flex flex-row gap-[2px]'>
                      <BookIcon width={24} height={18} />
                      <p className='text-sm text-gray-600'>
                        매일 {meeting.readingTimeGoal}분
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
