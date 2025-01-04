'use client';

import { useEffect, useMemo, useState } from 'react';
import Calendar from 'react-calendar';
import BookRankIcon from '../_svg/BookRankIcon';
import { IFilterState, IMeeting, IPopularBooks } from '../types';
import CustomDropdown from './CustomDropdown';
import { getPopularBooks } from './_lib/getPopularBooks';
import { useMeetingsInfiniteQuery } from './_lib/useMeetingsInfiniteQuery';
import SearchIcon from '@/app/_svg/SearchIcon';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Switch } from '@/components/ui/switch';
import BookIcon from '@/public/BookIcon';
import CalendarIcon from '@/public/CalendarIcon';
import ChevronDownIcon from '@/public/ChevronDownIcon';
import RotateCwIcon from '@/public/RotateCwIcon';
import UsersIcon from '@/public/UsersIcon';
import { format } from 'date-fns';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function MainPageBody() {
  const [meetingsData, setMeetingsData] = useState<IMeeting[]>([]);
  const [popularBooks, setPopularBooks] = useState<IPopularBooks[]>([]);
  const [filterState, setFilterState] = useState<IFilterState>({
    startDate: null,
    recruitingOnly: true,
    targetTime: null,
  });
  const [searchBarHasText, setSearchBarHasText] = useState<string>('');
  const { data, isLoading, isError, error } = useMeetingsInfiniteQuery();
  const today = new Date();
  const router = useRouter();

  useEffect(() => {
    if (data?.pages && data.pages.length > 0) {
      const firstPage = data.pages[0];
      setMeetingsData(firstPage || []);
    } else {
      setMeetingsData([]);
    }
  }, [data]);

  useEffect(() => {
    const loadPopularBooks = async () => {
      try {
        const data = await getPopularBooks({ page: 0, size: 5 });
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
    if (!meetingsData || meetingsData.length === 0) {
      return [];
    }

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
          <div className='flex flex-row relative w-[565px] h-[64px] px-4 stroke-customGreen-500'>
            {!searchBarHasText && (
              <div className='absolute top-5 right-8'>
                <SearchIcon width={24} height={24} />
              </div>
            )}
            <Input
              className='w-full h-full px-4 border-[2px] border-customGreen-500 font-medium text-[18px] shadow-lg'
              onChange={(e) => setSearchBarHasText(e.target.value)}
              value={searchBarHasText}
              placeholder='읽고 싶은 책의 모임을 찾아보세요'
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  router.push(`/search/${searchBarHasText}`);
                }
              }}
            />
          </div>
        </div>
        <div className='w-[70rem] h-[30rem]'>
          <div className='mb-4'>
            <h2 className='text-xl font-bold'>많은 모임을 만들어낸 책</h2>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-5 gap-4 relative'>
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
                <div>
                  <div className='absolute z-10 top-0 left-[26px] text-[22px] font-bold text-customGreen-500'>
                    {idx + 1}
                  </div>
                  <BookRankIcon
                    width={40}
                    height={60}
                    className='absolute -top-[6px] left-[12px]'
                  />
                </div>
                <p className='text-[14px] text-white bg-[rgba(0,0,0,.5)] py-[2px] px-[6px] rounded-[2px] flex flex-row absolute right-2 bottom-2'>
                  <span>모집중인 모임</span>
                  <span className='ml-2'>{book.gatheringCount}</span>
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className='w-[70rem]'>
          <div className='mb-4'>
            <h2 className='text-2xl font-bold mt-[82.13px]'>
              어디서든 독서를 시작해요
            </h2>
          </div>
          {/* FUNCTION PART - 목표 독서시간, 시작일 선택, 모집중만 보기, 정렬기능 */}
          <div className='flex flex-row items-center mb-2'>
            {(filterState.startDate || filterState.targetTime) && (
              <div
                className='bg-gray-300 py-[5px] px-[10px] rounded-[30px] hover:bg-gray-400 duration-150 ml-2 flex flex-row gap-2 items-center font-bold'
                onClick={resetFilters}
              >
                초기화
                <RotateCwIcon width={24} height={24} />
              </div>
            )}

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
              <ChevronDownIcon width={24} height={24} />
            </div>
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
                    const selectedDate = Array.isArray(date) ? date[0] : date;
                    handleFilterChange('startDate', selectedDate);
                  }}
                  value={filterState.startDate}
                />
              </CustomDropdown>
              <CalendarIcon width={24} height={24} />
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
          {/* MEETINGS PART - 모임목록 무한스크롤 */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            {filteredMeetings.map((meeting) => (
              <Link href={`/meeting-detail/${meeting.id}`} key={meeting.id}>
                <div className='w-full p-3 border rounded-lg shadow-md hover:shadow-lg  flex flex-col'>
                  <div className='flex flex-row gap-4'>
                    {/* MEETING IMAGE */}
                    <div className='w-[120px] h-[180px] flex justify-center items-center'>
                      <Image
                        src={meeting.bookImage}
                        alt='meeting-bookcover-image'
                        width={120}
                        height={180}
                      />
                    </div>
                    <div className='flex flex-col w-[358px] justify-between'>
                      <div className='flex flex-col'>
                        <span className='bg-[#F3E7E7] text-customRed py-[2px] px-[6px] rounded-[2px] w-[103px] text-[14px]'>
                          오늘부터 시작
                        </span>
                        <h3 className='text-lg font-bold mt-1'>
                          {meeting.name}
                        </h3>
                      </div>
                      {/* MEETING INFO */}
                      <div>
                        <div className='flex flex-row gap-[4px]'>
                          <CalendarIcon width={20} height={20} />
                          <p className='text-sm text-gray-600'>
                            {meeting.gatheringWeek / 7}주 동안
                          </p>
                        </div>
                        <div className='flex flex-row gap-[4px]'>
                          <BookIcon width={20} height={20} />
                          <p className='text-sm text-gray-600'>
                            매일 {meeting.readingTimeGoal}분
                          </p>
                        </div>
                        <div className='flex flex-row gap-[4px]'>
                          <UsersIcon width={20} height={20} />
                          <p className='text-sm text-gray-600'>
                            {meeting.currentCapacity}명 /{' '}
                            {meeting.maxCapacity < 1000
                              ? meeting.maxCapacity
                              : '∞'}
                            명
                          </p>
                        </div>
                        {/* PROGRESS BAR */}
                        <div>
                          <Progress
                            className='mt-1'
                            value={
                              (meeting.currentCapacity / meeting.maxCapacity) *
                              100
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
