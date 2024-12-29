'use client';

import { useState } from 'react';
import { DefaultError, useQuery } from '@tanstack/react-query';
import BookInfo from './BookInfo';
import { useBookContext } from '@/app/reviews/_components/BookContext';
import { searchBookByName } from '@/app/reviews/_lib/searchBookByName';
import SearchIcon from '@/components/common/icons/SearchIcon';
import { Skeleton } from '@/components/ui/skeleton';
import { SearchedBook } from '@/types/book';

type Props = { onSelect: () => void };
export default function BookSearchModal({ onSelect }: Props) {
  const [text, setText] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { book } = useBookContext();
  const {
    isLoading,
    data: books,
    refetch,
  } = useQuery<SearchedBook[], DefaultError>({
    queryKey: ['books', 'search'],
    queryFn: () => searchBookByName(text),
    enabled: false,
  });
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage('');
    if (!text.trim()) return;
    try {
      await refetch({ throwOnError: true });
    } catch (e) {
      if (e instanceof Error) {
        setErrorMessage(e.message);
      }
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  return (
    <div>
      <div className='px-5 pb-5'>
        <h3 className='text-[22px] p-2'>책 검색</h3>
        <form onSubmit={handleSubmit}>
          <div className='h-[52px] flex items-center border mt-4  px-4'>
            <SearchIcon />
            <input
              type='text'
              value={text}
              className='w-full px-2'
              placeholder='책의 제목을 3자 이상 입력해 주세요'
              onChange={handleChange}
            />
          </div>
        </form>
      </div>
      <div className='w-full border'></div>
      {isLoading && <Skeleton />}
      {errorMessage ? (
        <p>{errorMessage}</p>
      ) : books && !books.length ? (
        <p>일치하는 책이 없습니다.</p>
      ) : (
        books && books.map((book) => <BookInfo key={book.id} book={book} />)
      )}
      <div className='px-2 pt-5 pb-2'>
        <button
          className='w-full h-12 px-3 py-2 bg-customGreen-500 text-white rounded-sm disabled:bg-customGrey-100 disabled:text-customGrey-300'
          onClick={onSelect}
          disabled={!book.id}
        >
          확인
        </button>
      </div>
    </div>
  );
}
