'use client';

import React, { useEffect, useState } from 'react';
import Avatar from '@/components/common/icons/Avatar';
import BookICon from '@/components/common/icons/Book';
import CalendarIcon from '@/components/common/icons/Calendar';
import CommentIcon from '@/components/common/icons/Comment';
import InputReset from '@/components/common/icons/InputReset';
import LikeIcon from '@/components/common/icons/Like';
import PageNext from '@/components/common/icons/PageNext';
import PagePrev from '@/components/common/icons/PagePrev';
import ParticipantsIcon from '@/components/common/icons/Participants';
import ReadingTImeIcon from '@/components/common/icons/ReadingTIme';
import SearchIcon from '@/components/common/icons/SearchIcon';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { fetchAPIClient } from '@/lib/fetchAPI.client';
import ChevronDownIcon from '@/public/ChevronDownIcon';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

interface GatheringResult {
  id: number;
  name: string;
  currentCapacity: number;
  maxCapacity: number;
  bookTitle: string;
  thumbnail: string;
  bookImage: string;
  gatheringWeek: number;
  readingTimeGoal: number;
  startDate: string;
}

interface ReviewResult {
  id: number;
  userId: number;
  title: string;
  content: string;
  likes: number;
  createTime: string;
  userName: string;
  profile: string;
  bookTitle: string;
  commentCnt: number;
}

type SearchType = 'BOOK_NAME' | 'CONTENT' | 'TITLE';

export default function SearchTabs() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const searchWordFromPath = decodeURIComponent(pathname.split('/')[2] || '');
  const typeFromQuery = searchParams.get('type') as SearchType;

  const [searchWord, setSearchWord] = useState(searchWordFromPath);
  const [searchType, setSearchType] = useState<SearchType>(
    typeFromQuery || 'BOOK_NAME',
  );
  const [activeTab, setActiveTab] = useState<'gatherings' | 'reviews'>(
    'gatherings',
  );
  const [gatheringsData, setGatheringsData] = useState<GatheringResult[]>([]);
  const [reviewsData, setReviewsData] = useState<ReviewResult[]>([]);
  const [gatheringPage, setGatheringPage] = useState(0);
  const [reviewPage, setReviewPage] = useState(0);
  const [gatheringTotalCount, setGatheringTotalCount] = useState(0);
  const [reviewTotalCount, setReviewTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const PAGE_SIZE_GATHERINGS = 3;
  const PAGE_SIZE_REVIEWS = 3;
  const MAX_PAGE_DISPLAY = 5;

  const options: { value: SearchType; label: string }[] = [
    { value: 'BOOK_NAME', label: '도서명' },
    { value: 'CONTENT', label: '내용' },
    { value: 'TITLE', label: '제목' },
  ];

  const fetchGatherings = async (page: number) => {
    setIsLoading(true);
    try {
      const response = await fetchAPIClient(
        `/api/gatheringSearch/search-gatherings?searchWord=${encodeURIComponent(
          searchWord,
        )}&searchType=${searchType}&page=${page}&size=${PAGE_SIZE_GATHERINGS}`,
        'GET',
      );
      if (response.code === 'INVALID_SEARCH_WORD') {
        setErrorMessage('검색어는 최소 2글자 이상이어야 합니다.');
        setIsLoading(false);
        return;
      }
      setGatheringsData(response.result.gatheringResultPageResponses || []);
      setGatheringTotalCount(response.result.totalCount || 0);
    } catch (error) {
      console.error('모임 데이터 가져오기 실패:', error);
    }
    setIsLoading(false);
  };

  const fetchReviews = async (page: number) => {
    setIsLoading(true);
    try {
      const response = await fetchAPIClient(
        `/api/gatheringSearch/search-reviews?searchWord=${encodeURIComponent(
          searchWord,
        )}&searchType=${searchType}&page=${page}&size=${PAGE_SIZE_REVIEWS}`,
        'GET',
      );
      if (response.code === 'INVALID_SEARCH_WORD') {
        setErrorMessage('검색어는 최소 2글자 이상이어야 합니다.');
        setIsLoading(false);
        return;
      }
      setReviewsData(response.result.reviewResultPageResponses || []);
      setReviewTotalCount(response.result.reviewTotalCount || 0);
    } catch (error) {
      console.error('리뷰 데이터 가져오기 실패:', error);
    }
    setIsLoading(false);
  };

  const handleSearch = (type?: SearchType) => {
    const searchTypeToUse = type || searchType;
    if (searchWord.trim().length < 2) {
      setErrorMessage('검색어는 최소 2글자 이상이어야 합니다.');
      return;
    }
    setErrorMessage('');
    setGatheringPage(0);
    setReviewPage(0);

    router.push(`/search/${searchWord}?type=${searchTypeToUse}`);

    if (activeTab === 'gatherings') {
      fetchGatherings(0);
    } else {
      fetchReviews(0);
    }
  };

  useEffect(() => {
    if (activeTab === 'gatherings') {
      fetchGatherings(gatheringPage);
    } else if (activeTab === 'reviews') {
      fetchReviews(reviewPage);
    }
  }, [activeTab, gatheringPage, reviewPage, searchType]);

  const renderPagination = (
    currentPage: number,
    totalCount: number,
    pageSize: number,
    setPage: React.Dispatch<React.SetStateAction<number>>,
  ) => {
    if (totalCount === 0) return null;

    const totalPages = Math.ceil(totalCount / pageSize);
    const startPage = Math.max(
      0,
      Math.min(
        currentPage - Math.floor(MAX_PAGE_DISPLAY / 2),
        totalPages - MAX_PAGE_DISPLAY,
      ),
    );
    const endPage = Math.min(totalPages, startPage + MAX_PAGE_DISPLAY);

    return (
      <div className='flex justify-center gap-4 pt-[72px] mb-20'>
        <button
          onClick={() => setPage(currentPage - 1)}
          disabled={currentPage === 0}
          className='disabled:cursor-not-allowed'
        >
          <PagePrev
            className={`w-6 h-6 ${currentPage === 0 ? 'text-customGrey-200' : 'text-customGrey-700'}`}
          />
        </button>
        {Array.from(
          { length: endPage - startPage },
          (_, index) => startPage + index,
        ).map((page) => (
          <button
            key={page}
            onClick={() => setPage(page)}
            className={`px-2 py-1 ${page === currentPage ? 'font-bold  text-customGreen-500' : ''}`}
          >
            {page + 1}
          </button>
        ))}
        <button
          onClick={() => setPage(currentPage + 1)}
          disabled={(currentPage + 1) * pageSize >= totalCount}
          className='disabled:cursor-not-allowed'
        >
          <PageNext
            className={`w-6 h-6 ${
              (currentPage + 1) * pageSize >= totalCount
                ? 'text-customGrey-200'
                : 'text-customGrey-700'
            }`}
          />
        </button>
      </div>
    );
  };

  return (
    <div className='flex flex-col items-center mx-[350px]'>
      <div className='flex w-full h-16 py-1 mb-20 mt-32 items-center justify-between border border-gray-300 rounded-lg'>
        <div className='flex w-full relative items-center gap-2 ml-6'>
          <SearchIcon className='w-6 h-6 text-black' />
          <input
            type='text'
            placeholder='읽고 싶은 책의 모임, 리뷰를 검색해 보세요'
            value={searchWord}
            onChange={(e) => setSearchWord(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSearch();
            }}
            className='text-lg w-full font-normal border-0 focus:outline-none'
          />
          {searchWord.trim() && (
            <div className='absolute right-0'>
              <InputReset
                onClick={() => setSearchWord('')}
                className='w-6 h-6 text-customGrey-500'
              />
            </div>
          )}
        </div>
        <div className='relative flex items-center justify-center mr-6'>
          <span className='absolute left-0 text-customGrey-300 w-6 h-5 flex items-center justify-center'>
            |
          </span>
          <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
            <DropdownMenuTrigger className='whitespace-nowrap w-40 py-4 hover:bg-gray-100 focus:outline-none'>
              {options.find((option) => option.value === searchType)?.label ||
                '선택'}
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align='start'
              sideOffset={4}
              alignOffset={17}
              className='flex flex-col p-2 min-w-[168px] border-2 border-customGrey-100 bg-white rounded-md'
            >
              {options.map((option) => (
                <DropdownMenuItem
                  key={option.value}
                  onClick={() => {
                    setSearchType(option.value);
                    handleSearch(option.value);
                    setIsDropdownOpen(false);
                  }}
                  className='cursor-pointer p-4 text-[16px] justify-center hover:bg-customGrey-100'
                >
                  {option.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <span
            className={`absolute right-0 transition-transform duration-200 ${isDropdownOpen ? 'rotate-0' : 'rotate-180'}`}
          >
            <ChevronDownIcon width={24} height={24} />
          </span>
        </div>
        {errorMessage && (
          <p className='absolute bottom-[-30px] text-red-500'>{errorMessage}</p>
        )}
      </div>

      <div className='flex gap-6 w-full items-center justify-start border-b-2 border-gray-100 '>
        <button
          onClick={() => setActiveTab('gatherings')}
          className={`flex justify-center text-xl px-[2px] py-1 gap-[6px] ${
            activeTab === 'gatherings'
              ? 'border-b-4 border-black font-bold'
              : 'border-b-4 border-transparent'
          }`}
        >
          <p>모임</p>
          <p>{gatheringTotalCount > 0 && gatheringTotalCount}</p>
        </button>
        <button
          onClick={() => setActiveTab('reviews')}
          className={`flex text-xl px-[2px] py-1 gap-[6px] nowrap ${
            activeTab === 'reviews'
              ? 'border-b-4 border-black font-bold'
              : 'border-b-4 border-transparent'
          }`}
        >
          <p>독서 리뷰</p>
          <p>{reviewTotalCount > 0 && reviewTotalCount}</p>
        </button>
      </div>

      {isLoading && (
        <div className='flex items-center h-full w-full justify-center mt-[200px]'>
          <div className='h-8 w-8 animate-spin rounded-full border-4 border-customGreen-500 border-t-transparent' />
        </div>
      )}

      {!isLoading && activeTab === 'gatherings' && (
        <div className='w-full h-full mt-4'>
          {gatheringsData.length > 0 ? (
            <div className='grid grid-rows-3 gap-4'>
              {gatheringsData.map((item) => (
                <Link
                  href={`/meeting-detail/${item.id}`}
                  key={item.id}
                  className='relative rounded-[2px] px-3 pt-3 pb-8 border-b'
                >
                  <div className='flex gap-4'>
                    <div className='relative w-[120px] h-[180px]'>
                      <Image
                        src={item.bookImage}
                        alt={item.bookTitle}
                        layout='fill'
                        objectFit='cover'
                        className='rounded'
                      />
                    </div>
                    <div className='flex flex-col justify-between text-base font-medium'>
                      <div className='flex flex-col gap-1 justify-center items-start'>
                        <div
                          className={`flex flex-0 text-sm font-medium px-[2px] py-[6px] rounded-[2px] ${
                            new Date(item.startDate).toDateString() ===
                            new Date().toDateString()
                              ? 'text-customRed bg-[#F3E7E7]'
                              : new Date(item.startDate).toDateString() ===
                                  new Date(
                                    new Date().setDate(
                                      new Date().getDate() + 1,
                                    ),
                                  ).toDateString()
                                ? 'text-customOrange-600 bg-customOrange-50'
                                : new Date(item.startDate) > new Date()
                                  ? 'text-customGreen-500 bg-customGreen-50'
                                  : 'text-customGrey-500 bg-customGrey-100'
                          }`}
                        >
                          {new Date(item.startDate).toDateString() ===
                          new Date().toDateString()
                            ? '오늘부터 시작'
                            : new Date(item.startDate).toDateString() ===
                                new Date(
                                  new Date().setDate(new Date().getDate() + 1),
                                ).toDateString()
                              ? '내일부터 시작'
                              : new Date(item.startDate) > new Date()
                                ? `${Math.ceil(
                                    (new Date(item.startDate).getTime() -
                                      new Date().getTime()) /
                                      (1000 * 60 * 60 * 24),
                                  )}일 뒤 시작`
                                : '모집 마감'}
                        </div>

                        <p className='block text-lg font-bold text-customGrey-800 mb-2'>
                          {item.name}
                        </p>
                      </div>
                      <div className='flex flex-col gap-[2px] text-base font-medium text-customGrey-500'>
                        <div className='flex gap-1 justify-start items-center'>
                          <CalendarIcon className='w-5 h-5' />
                          <p>{Math.floor(item.gatheringWeek / 7)}주 동안</p>
                        </div>
                        <div className='flex gap-1 justify-start items-center'>
                          <ReadingTImeIcon className='w-5 h-5' />
                          <p>
                            매일{' '}
                            {item.readingTimeGoal >= 90
                              ? '1시간 이상'
                              : `${item.readingTimeGoal}분`}
                          </p>
                        </div>
                        <div className='flex gap-1 justify-start items-center'>
                          <ParticipantsIcon className='w-5 h-5' />
                          <p>
                            {item.currentCapacity}명 /{' '}
                            {item.maxCapacity > 1000
                              ? ' 무제한'
                              : `${item.maxCapacity}명`}
                          </p>
                        </div>
                        <div className='w-[358px] h-3 bg-customGrey-100 rounded-full mt-[2px]'>
                          <div
                            className='h-full bg-customGreen-500 rounded-full '
                            style={{
                              width:
                                item.maxCapacity > 1000
                                  ? '100%'
                                  : `${(item.currentCapacity / item.maxCapacity) * 100}%`,
                            }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p className='flex items-center justify-center text-center my-40 text-customGrey-400 text-base font-medium'>
              검색 결과가 없습니다. <br />
              다른 검색어를 입력해 보세요.
            </p>
          )}
          {renderPagination(
            gatheringPage,
            gatheringTotalCount,
            PAGE_SIZE_GATHERINGS,
            setGatheringPage,
          )}
        </div>
      )}

      {!isLoading && activeTab === 'reviews' && (
        <div className='w-full h-full mt-4'>
          {reviewsData.length > 0 ? (
            reviewsData.map((item) => (
              <Link
                href={`/reviews/${item.id}`}
                key={item.id}
                className='flex flex-col w-full h-full items-start justify-center gap-3 py-4 pb-8 border-b'
              >
                <div className='flex justify-start items-center gap-[6px]'>
                  <div className='flex items-center justify-center py-1 px-[6px] gap-1 bg-[#EAF7F2] rounded-[2px]'>
                    <BookICon className='w-4 h-5 text-customGreen-500' />
                    <p className='text-xs font-normal text-customGreen-500'>
                      책
                    </p>
                  </div>
                  <p className='text-sm font-medium text-customGrey-500'>
                    {item.bookTitle}
                  </p>
                </div>
                <p className='text-lg font-medium text-customGrey-800'>
                  {item.title}
                </p>
                <p className='text-base font-normal text-customGrey-800 line-clamp-2'>
                  {item.content}
                </p>
                <div className='flex justify-between items-center w-full'>
                  <div className='flex gap-3 items-center justify-start'>
                    <div className='flex gap-1 items-center justify-start'>
                      {item.profile ? (
                        <Image
                          src={item.profile}
                          alt={`${item.userName}의 프로필 이미지`}
                          className='w-8 h-8 rounded-full border border-customGrey-100'
                          width={32}
                          height={32}
                        />
                      ) : (
                        <Avatar className='w-8 h-8' />
                      )}
                      <p className='text-sm font-medium text-customGrey-800'>
                        {item.userName}
                      </p>
                    </div>
                    <p className='text-sm font-normal text-customGrey-300'>
                      {item.createTime}
                    </p>
                  </div>
                  <div className='flex gap-5 text-sm font-bold text-customGrey-500'>
                    <div className='flex gap-1 justify-center items-center'>
                      <LikeIcon className='w-5 h-5 text-custom-500' />
                      <p>{item.likes}</p>
                    </div>
                    <div className='flex gap-1 justify-center items-center'>
                      <CommentIcon className='w-5 h-5 text-custom-500' />
                      <p>{item.commentCnt ?? 0}</p>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <p className='flex items-center justify-center text-center my-40 text-customGrey-400 text-base font-medium'>
              검색 결과가 없습니다. <br />
              다른 검색어를 입력해 보세요.
            </p>
          )}
          {renderPagination(
            reviewPage,
            reviewTotalCount,
            PAGE_SIZE_REVIEWS,
            setReviewPage,
          )}
        </div>
      )}
    </div>
  );
}
