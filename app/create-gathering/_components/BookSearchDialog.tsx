'use client';

import { useEffect, useState } from 'react';
import StarRating from './StarRating';
import SearchIcon from '@/components/common/icons/SearchIcon';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { fetchAPIClient } from '@/lib/fetchAPI.client';
import Image from 'next/image';

export interface Book {
  id: number;
  title: string;
  author: string;
  publisher: string;
  publisherDate: string;
  star: number;
  image: string;
}

interface BookSearchDialogProps {
  bookInfo: Book | null;
  setBookInfo: (book: Book | null) => void;
}

interface SuggestionListProps {
  id: number;
  title: string;
}

export default function BookSearchDialog({
  bookInfo,
  setBookInfo,
}: BookSearchDialogProps) {
  const [recommendedKeywords, setRecommendedKeywords] = useState<
    SuggestionListProps[]
  >([]);
  const [searchResults, setSearchResults] = useState<Book[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null); // 선택된 책 상태

  const fetchRecommendedKeywords = async () => {
    setLoading(true);
    const response = await fetchAPIClient(
      '/api/review/recommendedKeywords',
      'GET',
    );
    if (response?.result) {
      setRecommendedKeywords(
        response.result.map((item: SuggestionListProps) => item),
      );
    }
    setLoading(false);
  };

  const searchBooks = async (query: string) => {
    if (query.length < 3) {
      setErrorMessage('검색어는 최소 3글자 이상이어야 합니다.');
      return;
    }

    setErrorMessage('');
    setLoading(true);
    setSearched(true);

    setSelectedBook(null);

    const response = await fetchAPIClient(
      `/api/book/title-search?searchWord=${query}`,
      'GET',
    );
    if (response?.result) {
      setSearchResults(response.result);
    } else {
      setSearchResults([]);
    }
    setLoading(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setSearched(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      searchBooks(searchQuery);
    }
  };

  const handleKeywordClick = (keyword: string) => {
    setSearchQuery(keyword);
    searchBooks(keyword);
  };

  const handleBookClick = (book: Book) => {
    setSelectedBook(book);
  };

  const handleConfirmClick = () => {
    if (selectedBook) {
      setBookInfo(selectedBook);
      setIsDialogOpen(false);
    }
  };

  useEffect(() => {
    fetchRecommendedKeywords();
  }, []);

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <input
          type='text'
          value={bookInfo?.title || ''}
          onClick={() => setIsDialogOpen(true)}
          placeholder='검색어를 입력해 주세요'
          className='w-full h-11 border border-customGrey-100 rounded-lg px-[10px] py-[6px] text-sm focus:ring focus:ring-customGreen-500'
        />
      </DialogTrigger>
      <DialogContent className='flex flex-col w-[560px] h-[727px] p-0 gap-0'>
        <DialogHeader className='p-6 text-[22px] font-medium'>
          <DialogTitle>책 검색</DialogTitle>
        </DialogHeader>
        <div className='flex items-center justify-center w-full px-6 pb-5 pt-0 relative border-b border-customGrey-100'>
          <SearchIcon className='w-6 h-6 text-customGrey-800 absolute left-10' />
          <Input
            type='text'
            placeholder='책의 제목을 입력해 주세요'
            value={searchQuery}
            onChange={handleInputChange}
            onKeyDown={handleKeyPress}
            className='w-full pl-12 pr-4 align-middle text-[18px] font-normal'
          />
          {errorMessage && (
            <p className='text-customRed text-base absolute left-6 top-11'>
              {errorMessage}
            </p>
          )}
        </div>
        {searchQuery.trim() === '' && !searched ? (
          <div className='flex flex-col mt-6 gap-6 px-6 h-full'>
            <p className='mb-2 text-[18px] font-bold text-customGrey-500'>
              추천 검색어
            </p>
            <div className='flex flex-wrap gap-2'>
              {recommendedKeywords.slice(0, 7).map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleKeywordClick(item.title)}
                  className='px-3 py-2 bg-customGreen-50 text-customGrey text-[18px] font-medium rounded-full'
                >
                  {item.title}
                </button>
              ))}
            </div>
          </div>
        ) : loading ? (
          <div className='flex items-center h-full justify-center'>
            <div className='h-8 w-8 animate-spin rounded-full border-4 border-customGreen-500 border-t-transparent' />
          </div>
        ) : searchResults.length > 0 ? (
          <ul className='flex flex-col h-full pt-[10px] px-4 overflow-auto'>
            {searchResults.map((book) => (
              <li
                key={book.id}
                className={`flex items-center gap-[10px] p-[10px] cursor-pointer border-b border-customGrey-100 ${
                  selectedBook?.id === book.id ? 'bg-customGreen-200' : ''
                }`}
                onClick={() => handleBookClick(book)}
              >
                <Image
                  src={book.image}
                  alt={book.title}
                  width={90}
                  height={135}
                  className='object-cover'
                />
                <div className='flex flex-col gap-2 items-start h-full'>
                  <p className='text-customGrey-800 text-base font-medium'>
                    {book.title}
                  </p>
                  <div>
                    <p className='flex gap-2 text-customGrey-500 font-normal text-[14px]'>
                      저자
                      <span className='text-customGrey-800'>{book.author}</span>
                    </p>
                    <p className='flex gap-2 text-customGrey-500 font-normal text-[14px]'>
                      출판
                      <span className='text-customGrey-800'>
                        {book.publisher}
                      </span>
                    </p>
                    <p className='flex gap-2 text-customGrey-500 font-normal text-[14px]'>
                      발행
                      <span className='text-customGrey-800'>
                        {book.publisherDate}
                      </span>
                    </p>
                    <div className='flex gap-2 text-customGrey-500 font-normal text-[14px]'>
                      평점
                      <StarRating rating={book.star} />
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : searched ? (
          <div className='flex flex-col h-full items-center justify-center text-[18px] font-medium text-customGrey-400'>
            <p>검색 결과가 없습니다.</p>
            <p>다른 검색어를 입력해 보세요.</p>
          </div>
        ) : (
          <p className='flex flex-col h-full items-center justify-center text-[18px] font-medium text-customGrey-400'>
            엔터를 눌러 검색해보세요!
          </p>
        )}
        <div className='px-6 py-5'>
          <button
            onClick={handleConfirmClick}
            disabled={!selectedBook}
            className={`mt-4 w-full py-3 text-white font-bold rounded-md ${
              selectedBook
                ? 'bg-customGreen-500 hover:bg-customGreen-600'
                : 'bg-gray-300 cursor-not-allowed'
            }`}
          >
            확인
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
