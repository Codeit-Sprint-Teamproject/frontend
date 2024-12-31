'use client';

export default function ReadOnlyBookTitle({ title }: { title: string }) {
  return (
    <div className='flex flex-col gap-[18px] p-5 bg-customGrey-50 rounded-sm'>
      <h3 className='text-lg text-customGrey-800 font-bold'>
        어떤 책의 리뷰를 남기시겠어요?{' '}
        <span className='text-base text-customGrey-300 mr-3 font-medium'>
          필수
        </span>
      </h3>
      <div className='text-customGrey-300 bg-customGrey-100 px-1.5 py-2.5 rounded-md'>
        {title}
      </div>
    </div>
  );
}
