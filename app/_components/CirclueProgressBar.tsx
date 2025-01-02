import React from 'react';

interface CircularProgressProps {
  value: number; // 읽은 페이지 수
  max: number; // 전체 페이지 수
}

const CircularProgress: React.FC<CircularProgressProps> = ({ value, max }) => {
  const radius = 50;
  const strokeWidth = 12;
  const circumference = 2 * Math.PI * radius;
  const progress = (value / max) * 100;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className='flex items-center justify-center'>
      <svg
        width='70'
        height='70'
        className='absolute transform -rotate-90'
        viewBox='0 0 140 140'
      >
        {/* 배경 원 */}
        <circle
          cx='70'
          cy='70'
          r={radius}
          stroke='#e5e7eb'
          strokeWidth={strokeWidth}
          fill='none'
        />
        {/* 진행 원 */}
        <circle
          cx='70'
          cy='70'
          r={radius}
          stroke='#30B380'
          strokeWidth={strokeWidth}
          fill='none'
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className='transition-all duration-300 ease-in-out'
        />
      </svg>

      {/* 진행률 텍스트 */}
      <span className='text-sm font-bold text-gray-700'>
        {Math.round(progress)}%
      </span>
    </div>
  );
};

export default CircularProgress;
