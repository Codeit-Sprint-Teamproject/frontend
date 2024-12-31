'use client';

import { useState } from 'react';
import InputReset from '@/components/common/icons/InputReset';
import SearchIcon from '@/components/common/icons/SearchIcon';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import ChevronDownIcon from '@/public/ChevronDownIcon';
import { useRouter } from 'next/navigation';

type SearchType = 'BOOK_NAME' | 'CONTENT' | 'TITLE';

export default function SearchPage() {
  const router = useRouter();
  const [searchWord, setSearchWord] = useState('');
  const [searchType, setSearchType] = useState<SearchType>('BOOK_NAME');
  const [errorMessage, setErrorMessage] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleSearch = () => {
    if (searchWord.trim().length < 2) {
      setErrorMessage('검색어는 최소 2글자 이상이어야 합니다.');
      return;
    }
    setErrorMessage('');
    router.push(`/search/${searchWord}?type=${searchType}`);
  };

  const handleKeyPress = (
    event: React.KeyboardEvent<
      HTMLInputElement | HTMLDivElement | HTMLButtonElement
    >,
  ) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const options: { value: SearchType; label: string }[] = [
    { value: 'BOOK_NAME', label: '도서명' },
    { value: 'CONTENT', label: '내용' },
    { value: 'TITLE', label: '제목' },
  ];

  return (
    <div className='flex flex-col items-center mx-20'>
      <div className='flex relative  w-full max-w-[703px] h-16 py-1 mb-20 mt-32 items-center justify-between border border-gray-300 rounded-lg'>
        <div className='flex w-full relative items-center gap-2 ml-6'>
          <SearchIcon className='w-6 h-6 text-black' />
          <input
            type='text'
            placeholder='읽고 싶은 책의 모임, 리뷰를 검색해 보세요'
            value={searchWord}
            onChange={(e) => setSearchWord(e.target.value)}
            onKeyDown={handleKeyPress}
            className='text-lg w-full font-normal border-0 focus:outline-none flex-1 mr-4'
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
          <p className='absolute bottom-[-30px] left-8 text-red-500'>
            {errorMessage}
          </p>
        )}
      </div>
    </div>
  );
}
