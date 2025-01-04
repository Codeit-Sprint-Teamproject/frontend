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
            {popularBooks?.map((book, idx) => (
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

            <div className='w-[160px] h-[40px] bg-white px-2 rounded-[4px] border-[1px] border-customGrey-100 ml-2 flex flex-row gap-1 items-center'>
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
            <div className='w-[140px] h-[40px] bg-white px-2 rounded-[4px] border-[1px] border-customGrey-100 ml-2 flex flex-row gap-2 items-center'>
              <CustomDropdown
                trigger={
                  filterState.startDate
                    ? filterState.startDate.toLocaleDateString()
                    : '모임 시작일'
                }
                label='모임 시작일'
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
              <Label htmlFor='recruiting-only' className='text-[14px]'>
                모집중만 보기
              </Label>
              <Switch
                id='recruiting only'
                checked={filterState.recruitingOnly}
                onCheckedChange={(checked) =>
                  handleFilterChange('recruitingOnly', checked)
                }
              />
            </div>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-6'>
            {filteredMeetings.map((meeting) => (
              <Link href={`/meeting-detail/${meeting.id}`} key={meeting.id}>
                <div className='w-full p-3 border rounded-lg shadow-md hover:shadow-lg  flex flex-col'>
                  <div className='flex flex-row gap-4'>
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
                        <div className='flex flex-col gap-1 justify-center items-start'>
                          <div
                            className={`flex flex-0 text-sm font-medium px-[2px] py-[6px] rounded-[2px] ${
                              new Date(meeting.startDate).toDateString() ===
                              new Date().toDateString()
                                ? 'text-customRed bg-[#F3E7E7]'
                                : new Date(meeting.startDate).toDateString() ===
                                    new Date(
                                      new Date().setDate(
                                        new Date().getDate() + 1,
                                      ),
                                    ).toDateString()
                                  ? 'text-customOrange-600 bg-customOrange-50'
                                  : new Date(meeting.startDate) > new Date()
                                    ? 'text-customGreen-500 bg-customGreen-50'
                                    : 'text-customGrey-500 bg-customGrey-100'
                            }`}
                          >
                            {new Date(meeting.startDate).toDateString() ===
                            new Date().toDateString()
                              ? '오늘부터 시작'
                              : new Date(meeting.startDate).toDateString() ===
                                  new Date(
                                    new Date().setDate(
                                      new Date().getDate() + 1,
                                    ),
                                  ).toDateString()
                                ? '내일부터 시작'
                                : new Date(meeting.startDate) > new Date()
                                  ? `${Math.ceil(
                                      (new Date(meeting.startDate).getTime() -
                                        new Date().getTime()) /
                                        (1000 * 60 * 60 * 24),
                                    )}일 뒤 시작`
                                  : '모집 마감'}
                          </div>

                          <p className='block text-lg font-bold text-customGrey-800 mb-2'>
                            {meeting.name}
                          </p>
                        </div>
                      </div>
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
                        <div className='w-[358px] h-3 bg-customGrey-100 rounded-full mt-[2px]'>
                          <div
                            className='h-full bg-customGreen-500 rounded-full '
                            style={{
                              width:
                                meeting.maxCapacity > 1000
                                  ? '100%'
                                  : `${(meeting.currentCapacity / meeting.maxCapacity) * 100}%`,
                            }}
                          ></div>
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
