'use client';

import React, { useEffect, useState } from 'react';
import InputReset from '@/components/common/icons/InputReset';
import PageNext from '@/components/common/icons/PageNext';
import PagePrev from '@/components/common/icons/PagePrev';
import SearchIcon from '@/components/common/icons/SearchIcon';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { fetchAPIClient } from '@/lib/fetchAPI.client';
import ChevronDownIcon from '@/public/ChevronDownIcon';
import { usePathname } from 'next/navigation';

interface GatheringResult {
  id: number;
  name: string;
  currentCapacity: number;
  maxCapacity: number;
  bookTitle: string;
}

interface ReviewResult {
  id: number;
  title: string;
  content: string;
  likes: number;
}

type SearchType = 'BOOK_NAME' | 'CONTENT' | 'TITLE';

export default function SearchTabs() {
  const pathname = usePathname();
  const searchWordFromPath = decodeURIComponent(pathname.split('/')[2] || '');
  const [searchWord, setSearchWord] = useState(searchWordFromPath);
  const [searchType, setSearchType] = useState<SearchType>('BOOK_NAME');
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

  const PAGE_SIZE_GATHERINGS = 6;
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
      setGatheringsData(response.gatheringResultPageResponses || []);
      setGatheringTotalCount(response.totalCount || 0);
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
      setReviewsData(response.reviewResultPageResponses || []);
      setReviewTotalCount(response.reviewTotalCount || 0);
    } catch (error) {
      console.error('리뷰 데이터 가져오기 실패:', error);
    }
    setIsLoading(false);
  };

  const handleSearch = () => {
    if (searchWord.trim().length < 2) {
      setErrorMessage('검색어는 최소 2글자 이상이어야 합니다.');
      return;
    }
    setErrorMessage('');
    setGatheringPage(0);
    setReviewPage(0);
    if (activeTab === 'gatherings') fetchGatherings(0);
    else fetchReviews(0);
  };

  useEffect(() => {
    if (activeTab === 'gatherings') fetchGatherings(gatheringPage);
    else fetchReviews(reviewPage);
  }, [activeTab, gatheringPage, reviewPage]);

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
      <div className='flex justify-center gap-4 pt-20 mb-20'>
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
            className={`px-2 py-1 ${page === currentPage ? 'font-bold bg-gray-200 rounded text-customGreen-500' : ''}`}
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
    <div className='flex flex-col items-center mx-20'>
      <div className='flex w-full max-w-[703px] h-16 py-1 mb-20 mt-32 items-center justify-between border border-gray-300 rounded-lg'>
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
              sideOffset={2}
              className='flex flex-col p-2 min-w-[168px] border-2 border-customGrey-100 bg-white rounded-md'
            >
              {options.map((option) => (
                <DropdownMenuItem
                  key={option.value}
                  onClick={() => {
                    setSearchType(option.value);
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

      <div className='flex gap-10 w-full items-center justify-start border-b-2 border-gray-100 pl-4'>
        <button
          onClick={() => setActiveTab('gatherings')}
          className={`w-36 text-xl px-4 py-2 ${
            activeTab === 'gatherings'
              ? 'border-b-4 border-black font-bold'
              : 'border-b-4 border-transparent'
          }`}
        >
          모임
          {gatheringTotalCount > 0 && gatheringTotalCount}
        </button>
        <button
          onClick={() => setActiveTab('reviews')}
          className={`w-36 text-xl px-4 py-2 ${
            activeTab === 'reviews'
              ? 'border-b-4 border-black font-bold'
              : 'border-b-4 border-transparent'
          }`}
        >
          독서 리뷰
          {reviewTotalCount > 0 && reviewTotalCount}
        </button>
      </div>

      {isLoading && <p>로딩 중...</p>}

      {!isLoading && activeTab === 'gatherings' && (
        <div>
          {gatheringsData.length > 0 ? (
            gatheringsData.map((item) => (
              <div key={item.id} className='mb-2 p-4 border rounded'>
                <strong>{item.name}</strong>
                <p>책 제목: {item.bookTitle}</p>
                <p>
                  현재 참여 인원: {item.currentCapacity}/{item.maxCapacity}
                </p>
              </div>
            ))
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
        <div>
          {reviewsData.length > 0 ? (
            reviewsData.map((item) => (
              <div key={item.id} className='mb-2 p-4 border rounded'>
                <strong>{item.title}</strong>
                <p>{item.content}</p>
                <p>좋아요: {item.likes}</p>
              </div>
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
