import Image from 'next/image';

interface BookInfoProps {
  bookImage?: string;
  bookTitle?: string;
  author?: string;
  publisher?: string;
  publishDate?: string;
  star?: number;
}

const BookInfo = ({
  bookImage,
  bookTitle = '책 이름',
  author = '저자',
  publisher = '출판사',
  publishDate = '출판일',
  star = 10,
}: BookInfoProps) => {
  return (
    <>
      <div className='mt-[9px] py-[16px] px-[10px] flex flex-row border-[1px] border-[rgba(0, 0, 0, 0.10)]'>
        <div className='w-[87px] h-[132px] flex justify-center items-center relative'>
          <Image
            src={bookImage}
            alt='book-image'
            layout='fill'
            objectFit='cover'
          />
        </div>
        <div className='ml-[18px]'>
          <span className='text-xl font-bold'>{bookTitle}</span>
          <div className='grid grid-cols-[1fr_2fr] mt-[9px]'>
            <span>저자</span>
            <span className='ml-4'>{author}</span>
            <span>출판</span>
            <span className='ml-4'>{publisher}</span>
            <span>발행일</span>
            <span className='ml-4'>{publishDate}</span>
            <span>평점</span>
            <span className='ml-4'>☆☆☆☆☆ {`${star}`}</span>
          </div>
        </div>
      </div>
    </>
  );
};
export default BookInfo;
