'use client';

import { useState } from 'react';
import DropDownThinIcon from '../_svg/DropDownThinIcon';
import DropUpThinIcon from '../_svg/DropUpThinIcon';
import { BookReviewFilter } from '@/types/review';

export default function Filter() {
  const [isOpen, setIsOpen] = useState(false);
  const [filter, setFilter] = useState<BookReviewFilter>('ALL');
  const filters = [
    { label: '전체 보기', value: 'ALL' },
    { label: '🤗 따뜻한 위로', value: 'CS' },
    { label: '🤩 흥미진진', value: 'FUN' },
    { label: '😢 눈물샘 자극', value: 'SAD' },
    { label: '📚 지식 쏙쏙', value: 'KL' },
    { label: '⏳ 시간 순삭', value: 'TIME' },
    { label: '🔍 새로운 발견', value: 'FIND' },
  ];
  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };
  const changeFilter = (value: BookReviewFilter) => {
    setFilter(value);
  };
  const applyButtonStyle = (value: BookReviewFilter) => {
    if (filter === value) {
      return 'bg-black text-white font-bold';
    }
  };
  return (
    <div className='flex flex-col gap-2'>
      <div className='flex flex-wrap gap-2.5 relative'>
        {filters.slice(0, 4).map(({ label, value }) => (
          <button
            key={value}
            className={`p-2.5 border rounded-full ${applyButtonStyle(value as BookReviewFilter)}`}
            onClick={() => changeFilter(value as BookReviewFilter)}
          >
            {label}
          </button>
        ))}
        {!isOpen && (
          <div className='flex items-center w-18'>
            <button className='flex items-center h-11 pl-2 border rounded-full'>
              <span className='blur-[0.5px]'>📚</span>
              <button
                className='w-11 h-11 rounded-full border'
                onClick={toggleOpen}
              >
                <DropDownThinIcon className='w-7 h-7 mx-auto' />
              </button>
            </button>
          </div>
        )}
        {isOpen && (
          <button
            className='w-11 h-11 rounded-full border'
            onClick={toggleOpen}
          >
            <DropUpThinIcon className='w-7 h-7 mx-auto' />
          </button>
        )}
      </div>
      <div className={`flex gap-2.5 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
        {filters.slice(4).map(({ label, value }) => (
          <button
            key={value}
            className={`p-2.5 border rounded-full  ${applyButtonStyle(value as BookReviewFilter)}`}
            onClick={() => changeFilter(value as BookReviewFilter)}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}
