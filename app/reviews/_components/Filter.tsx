'use client';

import DropDownThinIcon from '../_svg/DropDownThinIcon';
import DropUpThinIcon from '../_svg/DropUpThinIcon';
import { BookReviewFilter } from '@/types/review';

type Props = {
  filter: BookReviewFilter;
  isOpen: boolean;
  onFilterChange: (filter: BookReviewFilter) => void;
  onToggle: () => void;
};

export default function Filter({
  filter,
  isOpen,
  onFilterChange,
  onToggle,
}: Props) {
  const filters = [
    { label: '전체', value: 'ALL' },
    { label: '🤗 따뜻한 위로', value: 'CS' },
    { label: '🤩 흥미진진', value: 'FUN' },
    { label: '😢 눈물샘 자극', value: 'SAD' },
    { label: '📚 지식 쏙쏙', value: 'KL' },
    { label: '⏳ 시간 순삭', value: 'TIME' },
    { label: '🔍 새로운 발견', value: 'FIND' },
  ];
  const applyButtonStyle = (value: BookReviewFilter) => {
    if (filter === value) {
      return 'bg-black text-white font-bold';
    }
  };

  return (
    <div className='flex flex-col gap-2 mb-9'>
      <div className='flex flex-wrap gap-2 relative'>
        {filters.slice(0, 4).map(({ label, value }) => (
          <button
            key={value}
            className={`p-2.5 border rounded-full ${applyButtonStyle(value as BookReviewFilter)}`}
            onClick={() => onFilterChange(value as BookReviewFilter)}
          >
            {label}
          </button>
        ))}
        {!isOpen && (
          <div className='flex items-center w-18'>
            <div className='flex items-center h-11 pl-2 border rounded-full'>
              <span className='blur-[0.5px]'>📚</span>
              <button
                className='w-11 h-11 rounded-full border'
                onClick={onToggle}
              >
                <DropDownThinIcon className='w-7 h-7 mx-auto' />
              </button>
            </div>
          </div>
        )}
        {isOpen && (
          <button
            className='w-11 h-11 ml-5 rounded-full border'
            onClick={onToggle}
          >
            <DropUpThinIcon className='w-7 h-7 mx-auto' />
          </button>
        )}
      </div>
      <div className={`flex gap-2 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
        {filters.slice(4).map(({ label, value }) => (
          <button
            key={value}
            className={`p-2.5 border rounded-full  ${applyButtonStyle(value as BookReviewFilter)}`}
            onClick={() => onFilterChange(value as BookReviewFilter)}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}
