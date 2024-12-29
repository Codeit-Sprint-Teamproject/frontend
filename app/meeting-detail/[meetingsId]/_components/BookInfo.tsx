import { ReactNode } from 'react';
import { Rating } from 'react-simple-star-rating';
import Image from 'next/image';

interface BookInfoProps {
  bookImage?: string;
  bookTitle?: string;
  author?: string;
  publisher?: string;
  publishDate?: string;
  star?: number;
  children?: ReactNode;
}

const BookInfo = ({
  bookImage,
  bookTitle = '책 이름',
  author = '저자',
  publisher = '출판사',
  publishDate = '출판일',
  star = 10,
  children,
}: BookInfoProps) => {
  return (
    <>
      <div className='mt-[9px] py-[16px] px-[10px] flex flex-col border-[1px] border-[rgba(0, 0, 0, 0.10)]'>
        <div className='flex flex-row'>
          <div className='w-[87px] h-[132px] flex justify-center items-center relative'>
            <Image
              src={bookImage}
              alt='book-image'
              layout='fill'
              objectFit='cover'
            />
          </div>
          <div className='w-[400px] ml-[18px] flex flex-col'>
            <span className='text-xl font-bold'>{bookTitle}</span>
            <div className='flex flex-row mt-2'>
              <div className='flex flex-col'>
                <span>저자</span>
                <span>출판</span>
                <span>발행일</span>
                <span className='mt-[2px]'>평점</span>
              </div>
              <div className='flex flex-col items-start'>
                <span className='ml-4'>{author}</span>
                <span className='ml-4'>{publisher}</span>
                <span className='ml-4'>{publishDate}</span>
                <div className='ml-4 flex flex-row items-center gap-1'>
                  <Rating
                    size={20}
                    readonly
                    initialValue={star / 2}
                    allowFraction={true}
                    SVGstyle={{ display: 'inline' }}
                    fillColor='black'
                    style={{ marginBottom: '2px' }}
                  />
                  {`${star}`}
                </div>
              </div>
            </div>
          </div>
        </div>
        {children ? <div className='mt-4'>{children}</div> : <></>}
      </div>
    </>
  );
};
export default BookInfo;
